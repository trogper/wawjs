// TODO: refactor, extract indent logic 
// build stackLogger over indentLog
const buff = [];


const entry = (...args) => {

    let { self, callStack } = parse(stack(entry));
    console.error(buff.join(""), self, ...args, "{", callStack);
    //console.trace();
    buff.push("\t");
}
const exit = (...args) => {
    let { self, callStack } = parse(stack(exit));
    buff.pop();
    console.error(buff.join(""), "}", self, ...args);

}
const log = (...args) => {
    console.error(buff.join(""), ...args);
}
const stack = (above) => {
    const err = {
        name: 'XTrace'
    };
    Error.captureStackTrace(err, above || trace);
    return err.stack;
}

const parse = (stack) => {
    let [head, ...callers] = stack.split('\n').slice(1);
    let self = head.match(/^ *at *(.*) [(.*]/)[1];
    //callers = [callers[0],callers[1]||""];
    callers = [callers[0]];
    let callStack = callers.map(line => line.replace(/^ *at /, " <-- ")).join("");
    return { self, callStack };
}
module.exports = { entry, exit, log };

// function parseStack(stack) {
//     // taken from npm stack-trace
//     var lines = stack.split('\n').slice(1);

//     return lines
//         .map(function(line) {
//             if (line.match(/^\s*[-]{4,}$/)) {
//                 return {
//                     fileName: line,
//                     lineNumber: null,
//                     functionName: null,
//                     typeName: null,
//                     methodName: null,
//                     columnNumber: null,
//                     'native': null,
//                 };
//             }
//             var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
//             if (!lineMatch) {
//                 return;
//             }

//             var object = null;
//             var method = null;
//             var functionName = null;
//             var typeName = null;
//             var methodName = null;
//             var isNative = (lineMatch[5] === 'native');

//             if (lineMatch[1]) {
//                 functionName = lineMatch[1];
//                 var methodStart = functionName.lastIndexOf('.');
//                 if (functionName[methodStart - 1] == '.')
//                     methodStart--;
//                 if (methodStart > 0) {
//                     object = functionName.substr(0, methodStart);
//                     method = functionName.substr(methodStart + 1);
//                     var objectEnd = object.indexOf('.Module');
//                     if (objectEnd > 0) {
//                         functionName = functionName.substr(objectEnd + 1);
//                         object = object.substr(0, objectEnd);
//                     }
//                 }
//                 typeName = null;
//             }

//             if (method) {
//                 typeName = object;
//                 methodName = method;
//             }

//             if (method === '<anonymous>') {
//                 methodName = null;
//                 functionName = null;
//             }

//             var properties = {
//                 fileName: lineMatch[2] || null,
//                 lineNumber: parseInt(lineMatch[3], 10) || null,
//                 functionName: functionName,
//                 typeName: typeName,
//                 methodName: methodName,
//                 columnNumber: parseInt(lineMatch[4], 10) || null,
//                 'native': isNative,
//             };

//             return properties;
//         })
//         .filter(function(callSite) {
//             return !!callSite;
//         });
// };