(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/regEx.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "passwordRegEx",
    ()=>passwordRegEx,
    "usernameRegEx",
    ()=>usernameRegEx
]);
const usernameRegEx = /^[a-zA-Z0-9]+$/;
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9\s])(?!.*\s).{8,}$/;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/Register.jsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/src/app/components/Register.jsx'\n\nExpected ',', got 'const'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
]);

//# sourceMappingURL=src_08d067ae._.js.map