module.exports = [
"[project]/src/lib/regEx.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "passwordRegEx",
    ()=>passwordRegEx,
    "usernameRegEx",
    ()=>usernameRegEx
]);
const usernameRegEx = /^[a-zA-Z0-9]+$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])(?!.*\s).{8,}$/;
}),
"[project]/src/app/components/Register.jsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/src/app/components/Register.jsx'\n\nExpected ',', got 'const'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=src_ca2d47f2._.js.map