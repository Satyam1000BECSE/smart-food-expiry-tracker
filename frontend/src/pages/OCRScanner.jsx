import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function OCRScanner() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const navigate = useNavigate(); // 🔥 THIS WAS MISSING

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await API.post("/ocr/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const extractedText = res.data.extracted_text;
        setText(extractedText); // 🔥 You forgot this also

        const dateMatch = extractedText.match(
            /\b\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/
        );

        if (dateMatch) {
            navigate("/add-product", {
                state: { expiry: dateMatch[0] },
            });
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-green-700">
                📸 Scan Expiry Date
            </h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-2 w-full rounded"
            />

            <button
                onClick={handleUpload}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Extract Text
            </button>

            {text && (
                <div className="bg-gray-100 p-4 rounded mt-4">
                    <h3 className="font-semibold">Extracted Text:</h3>
                    <p className="whitespace-pre-wrap">{text}</p>
                </div>
            )}
        </div>
    );
}


// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";


// export default function OCRScanner() {
//     const [file, setFile] = useState(null);
//     const [text, setText] = useState("");

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append("file", file);

//         const res = await API.post("/ocr/", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });

//         const extractedText = res.data.extracted_text;

//         const dateMatch = extractedText.match(
//             /\b\d{1,4}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/
//         );

//         if (dateMatch) {
//             // 🔥 YAHI LAGTA HAI
//             navigate("/add-product", {
//                 state: { expiry: dateMatch[0] },
//             });
//         }
//     };


//     return (
//         <div className="p-6 max-w-xl mx-auto space-y-4">
//             <h2 className="text-2xl font-bold text-green-700">
//                 📸 Scan Expiry Date
//             </h2>

//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 className="border p-2 w-full rounded"
//             />

//             <button
//                 onClick={handleUpload}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//                 Extract Text
//             </button>

//             {text && (
//                 <div className="bg-gray-100 p-4 rounded mt-4">
//                     <h3 className="font-semibold">Extracted Text:</h3>
//                     <p className="whitespace-pre-wrap">{text}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
