from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import subprocess
import os

app = Flask(__name__)
CORS(app)

DANGEROUS_WORDS = [
    "import",
    "open",
    "__",
    "exec",
    "eval",
    "os",
    "sys",
    "subprocess",
    "socket",
    "shutil",
    "pathlib",
]

@app.route("/run", methods=["POST"])
def run_bieberlang():
    code = request.json.get("code", "")

    if not code.strip():
        return jsonify({"output": "Error: No code provided."})

    for word in DANGEROUS_WORDS:
        if word in code:
            return jsonify({"output": f"Error: Unsafe code detected: {word}"})

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            suffix=".jb",
            delete=False,
            encoding="utf-8"
        ) as temp_file:
            temp_file.write(code)
            temp_path = temp_file.name

        result = subprocess.run(
            ["python", "run_bieber.py", temp_path],
            capture_output=True,
            text=True,
            timeout=3
        )

        output = result.stdout

        if result.stderr:
            output += "\n" + result.stderr

        if not output.strip():
            output = "Program ran successfully with no output."

        return jsonify({"output": output})

    except subprocess.TimeoutExpired:
        return jsonify({"output": "Error: Program timed out."})

    except Exception as e:
        return jsonify({"output": f"Error: {str(e)}"})

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == "__main__":
    app.run(port=5000, debug=True)