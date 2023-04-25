"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidirectionalFlatlist = void 0;
var react_native_1 = require("react-native");
var LINKING_ERROR = "The package 'react-native-flashlist' doesn't seem to be linked. Make sure: \n\n".concat(react_native_1.Platform.select({
    ios: "- You have run 'pod install'\n",
    default: "",
}), "- You rebuilt the app after installing the package\n") +
    "- You are not using Expo managed workflow\n";
var ComponentName = "DoubleSidedScrollView";
var BidirectionalFlatlist = (0, react_native_1.requireNativeComponent)(ComponentName);
exports.BidirectionalFlatlist = BidirectionalFlatlist;
if (BidirectionalFlatlist === null) {
    throw new Error(LINKING_ERROR);
}
//# sourceMappingURL=BidirectionalFlatlist.js.map