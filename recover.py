import json
import os

target_files = [
    r"ai\stage2\stage2.html",
    r"ai\stage2\stage2.css",
    r"ai\stage2\stage2.js",
    r"ai\stage3\stage3.html",
    r"ai\stage3\stage3.css",
    r"ai\stage3\stage3.js",
    r"ai\stage4\stage4.html",
    r"ai\stage4\stage4.css",
    r"ai\stage4\stage4.js"
]

file_contents = {tf: "" for tf in target_files}

with open("extracted_files_utf8.json", "r", encoding="utf-8") as f:
    for line in f:
        try:
            data = json.loads(line)
            if "tool_calls" in data:
                for call in data["tool_calls"]:
                    if call["name"] == "write_to_file":
                        args = call["args"]
                        target = args.get("TargetFile", "")
                        for tf in target_files:
                            if tf.replace("\\", "/") in target.replace("\\", "/"):
                                file_contents[tf] = args["CodeContent"]
        except Exception as e:
            print("Error parsing line", e)

for tf, content in file_contents.items():
    if content:
        full_path = os.path.join(r"C:\Users\HP\OneDrive\Desktop\code\Analyst_Roadmap", tf)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Recovered {tf}")
    else:
        print(f"Content not found for {tf}")
