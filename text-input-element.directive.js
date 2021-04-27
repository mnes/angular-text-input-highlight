import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
var TextInputElementDirective = /** @class */ (function () {
    function TextInputElementDirective() {
    }
    TextInputElementDirective.ɵfac = function TextInputElementDirective_Factory(t) { return new (t || TextInputElementDirective)(); };
    TextInputElementDirective.ɵdir = i0.ɵɵdefineDirective({ type: TextInputElementDirective, selectors: [["textarea", "mwlTextInputElement", ""]], hostVars: 2, hostBindings: function TextInputElementDirective_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("text-input-element", true);
        } } });
    return TextInputElementDirective;
}());
export { TextInputElementDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TextInputElementDirective, [{
        type: Directive,
        args: [{
                selector: 'textarea[mwlTextInputElement]',
                host: {
                    '[class.text-input-element]': 'true'
                }
            }]
    }], null, null); })();
//# sourceMappingURL=text-input-element.directive.js.map