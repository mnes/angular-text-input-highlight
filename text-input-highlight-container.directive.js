import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
var TextInputHighlightContainerDirective = /** @class */ (function () {
    function TextInputHighlightContainerDirective() {
    }
    TextInputHighlightContainerDirective.ɵfac = function TextInputHighlightContainerDirective_Factory(t) { return new (t || TextInputHighlightContainerDirective)(); };
    TextInputHighlightContainerDirective.ɵdir = i0.ɵɵdefineDirective({ type: TextInputHighlightContainerDirective, selectors: [["", "mwlTextInputHighlightContainer", ""]], hostVars: 2, hostBindings: function TextInputHighlightContainerDirective_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("text-input-highlight-container", true);
        } } });
    return TextInputHighlightContainerDirective;
}());
export { TextInputHighlightContainerDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TextInputHighlightContainerDirective, [{
        type: Directive,
        args: [{
                selector: '[mwlTextInputHighlightContainer]',
                host: {
                    '[class.text-input-highlight-container]': 'true'
                }
            }]
    }], null, null); })();
//# sourceMappingURL=text-input-highlight-container.directive.js.map