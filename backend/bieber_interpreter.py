from textx import metamodel_from_file


class Bieber:
    def __init__(self, grammar_file):
        self.mm = metamodel_from_file(grammar_file)
        self.variables = {}

    def run(self, program_file):
        model = self.mm.model_from_file(program_file)
        self.execute_program(model)

    def execute_program(self, program):
        self.methods = {method.name: method for method in program.methods}

        for stmt in program.statements:
            self.execute_statement(stmt)

    def execute_statement(self, stmt):
        cls_name = stmt.__class__.__name__

        if cls_name == "BabyAssignment":
            self.variables[stmt.variable] = self.eval_expr(stmt.value)

        elif cls_name == "BabyPrint":
            value = stmt.value
            if isinstance(value, str):
                print(value)
            else:
                print(self.eval_expr(value))

        elif cls_name == "BabyIncrement":
            count = self.count_babies(stmt.babyCount)
            self.variables[stmt.variable] = self.variables.get(stmt.variable, 0) + count

        elif cls_name == "BabyDecrement":
            count = self.count_downs(stmt.downCount)
            self.variables[stmt.variable] = self.variables.get(stmt.variable, 0) - count

        elif cls_name == "BabyLoop":
            condition = self.eval_condition(stmt.condition)
            while condition:
                for inner_stmt in stmt.statements:
                    self.execute_statement(inner_stmt)
                condition = self.eval_condition(stmt.condition)

        elif cls_name == "BabyIf":
            self.execute_if(stmt)

        elif cls_name == "BabyExpr":
            self.variables[stmt.variable] = self.eval_expr(stmt.expr)

        elif cls_name == "BabyCall":
            method = stmt.name
            for inner_stmt in method.statements:
                self.execute_statement(inner_stmt)

        else:
            raise Exception(f"Unknown statement type: {cls_name}")

    def execute_if(self, stmt):
        if self.eval_condition(stmt.condition):
            for inner_stmt in stmt.statements:
                self.execute_statement(inner_stmt)
            return

        for elif_stmt in stmt.elifs:
            if self.eval_condition(elif_stmt.condition):
                for inner_stmt in elif_stmt.statements:
                    self.execute_statement(inner_stmt)
                return

        if stmt.else_:
            for inner_stmt in stmt.else_.statements:
                self.execute_statement(inner_stmt)

    def eval_condition(self, condition):
        cls_name = condition.__class__.__name__

        if cls_name == "Condition":
            if hasattr(condition, "value") and condition.value:
                return self.eval_condition(condition.value)

        if cls_name == "BoolCondition":
            return bool(self.eval_expr(condition.value))

        if cls_name == "CompareCondition":
            left = self.eval_expr(condition.left)
            right = self.eval_expr(condition.right)

            if condition.op == "==":
                return left == right
            elif condition.op == "!=":
                return left != right
            elif condition.op == "<":
                return left < right
            elif condition.op == ">":
                return left > right
            elif condition.op == "<=":
                return left <= right
            elif condition.op == ">=":
                return left >= right

        raise Exception(f"Unknown condition: {condition}")

    def eval_expr(self, expr):
        cls_name = expr.__class__.__name__

        if isinstance(expr, bool):
            return expr

        if isinstance(expr, int):
            return expr

        if isinstance(expr, str):
            if expr == "true":
                return True
            if expr == "false":
                return False
            if expr in self.variables:
                return self.variables[expr]
            raise Exception(f"Undefined variable: {expr}")

        if cls_name == "Atom":
            if hasattr(expr, "value") and expr.value is not None:
                return self.eval_expr(expr.value)

            if hasattr(expr, "expr") and expr.expr is not None:
                return self.eval_expr(expr.expr)

        if cls_name == "AddExpr":
            result = self.eval_expr(expr.left)

            for op, right in zip(expr.ops, expr.rights):
                right_value = self.eval_expr(right)

                if op == "+":
                    result += right_value
                elif op == "-":
                    result -= right_value

            return result

        if cls_name == "MulExpr":
            result = self.eval_expr(expr.left)

            for op, right in zip(expr.ops, expr.rights):
                right_value = self.eval_expr(right)

                if op == "*":
                    result *= right_value
                elif op == "/":
                    result //= right_value
                elif op == "%":
                    result %= right_value

            return result

        raise Exception(f"Cannot evaluate expression: {expr}")

    def count_babies(self, baby_count):
        if baby_count is None:
            return 0

        count = 1
        while hasattr(baby_count, "babyCount") and baby_count.babyCount:
            count += 1
            baby_count = baby_count.babyCount

        return count

    def count_downs(self, down_count):
        if down_count is None:
            return 0

        count = 1
        while hasattr(down_count, "downCount") and down_count.downCount:
            count += 1
            down_count = down_count.downCount

        return count


if __name__ == "__main__":
    interpreter = Bieber("bieber_grammar.tx")
    interpreter.run("programs/multiplication.jb")