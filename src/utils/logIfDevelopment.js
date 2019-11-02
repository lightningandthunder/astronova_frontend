export default function logIfDevelopment(...data) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
        console.log(...data);
}