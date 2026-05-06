import sys
from bieber_interpreter import Bieber

program_file = sys.argv[1]

interpreter = Bieber("bieber_grammar.tx")
interpreter.run(program_file)