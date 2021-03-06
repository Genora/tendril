"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.next = exports.Next = exports.await = exports.Await = exports.value = exports.Value = void 0;
var free_1 = require("@quenk/noni/lib/control/monad/free");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var function_1 = require("@quenk/noni/lib/data/function");
var __1 = require("../");
/**
 * Value action.
 */
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value(value, next) {
        var _this = _super.call(this, next) || this;
        _this.value = value;
        _this.next = next;
        return _this;
    }
    Value.prototype.map = function (f) {
        return new Value(this.value, function_1.compose(this.next, f));
    };
    Value.prototype.exec = function (_) {
        return future_1.pure(this.next(this.value));
    };
    return Value;
}(__1.Action));
exports.Value = Value;
/**
 * value wraps a value so that it is available to the next value in the
 * chain.
 */
exports.value = function (value) {
    return free_1.liftF(new Value(value, function_1.identity));
};
/**
 * Await action.
 */
var Await = /** @class */ (function (_super) {
    __extends(Await, _super);
    function Await(f, next) {
        var _this = _super.call(this, next) || this;
        _this.f = f;
        _this.next = next;
        return _this;
    }
    Await.prototype.map = function (f) {
        return new Await(this.f, function_1.compose(this.next, f));
    };
    Await.prototype.exec = function (_) {
        return this.f().map(this.next);
    };
    return Await;
}(__1.Action));
exports.Await = Await;
/**
 * await a value from an asynchrounous operation before continuing.
 */
exports.await = function (f) {
    return free_1.liftF(new Await(f, function_1.identity));
};
/**
 * Next action.
 */
var Next = /** @class */ (function (_super) {
    __extends(Next, _super);
    function Next(request, next) {
        var _this = _super.call(this, next) || this;
        _this.request = request;
        _this.next = next;
        return _this;
    }
    Next.prototype.map = function (f) {
        return new Next(this.request, f(this.next));
    };
    Next.prototype.exec = function (ctx) {
        ctx.request = this.request;
        return ctx.next();
    };
    return Next;
}(__1.Action));
exports.Next = Next;
/**
 * next gives the go ahead to interpret the
 * actions of the next Filter chain.
 *
 * This action allows the Request in the context to be modified and
 * short-circuits the current chain.
 */
exports.next = function (r) { return free_1.liftF(new Next(r, undefined)); };
//# sourceMappingURL=index.js.map