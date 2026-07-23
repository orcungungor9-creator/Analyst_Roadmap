const fs = require('fs');
const path = require('path');

const target_files = [
    "ai/stage2/stage2.html",
    "ai/stage2/stage2.css",
    "ai/stage2/stage2.js",
    "ai/stage3/stage3.html",
    "ai/stage3/stage3.css",
    "ai/stage3/stage3.js",
    "ai/stage4/stage4.html",
    "ai/stage4/stage4.css",
    "ai/stage4/stage4.js"
];

let file_contents = {};
target_files.forEach(tf => file_contents[tf] = "");

try {
    const data = fs.readFileSync("extracted_files_utf8.json", "utf-8");
    const lines = data.split('\n');
    lines.forEach(line => {
        if (!line.trim()) return;
        try {
            const json = JSON.parse(line);
            if (json.tool_calls) {
                json.tool_calls.forEach(call => {
                    if (call.name === "write_to_file") {
                        const target = call.args.TargetFile || "";
                        target_files.forEach(tf => {
                            if (target.replace(/\\/g, '/').includes(tf)) {
                                file_contents[tf] = call.args.CodeContent;
                            }
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Error parsing line", e.message);
        }
    });

    target_files.forEach(tf => {
        if (file_contents[tf]) {
            const fullPath = path.join("C:/Users/HP/OneDrive/Desktop/code/Analyst_Roadmap", tf);
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, file_contents[tf], "utf-8");
            console.log("Recovered", tf);
        } else {
            console.log("Content not found for", tf);
        }
    });
} catch (e) {
    console.error(e);
}
