import { __decorate } from "tslib";
import { Directive } from '@angular/core';
var TextInputElementDirective = /** @class */ (function () {
    function TextInputElementDirective() {
    }
    TextInputElementDirective = __decorate([
        Directive({
            selector: 'textarea[mwlTextInputElement]',
            host: {
                '[class.text-input-element]': 'true'
            }
        })
    ], TextInputElementDirective);
    return TextInputElementDirective;
}());
export { TextInputElementDirective };
//# sourceMappingURL=text-input-element.directive.js.map