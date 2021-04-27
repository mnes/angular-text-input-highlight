import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputHighlightComponent } from './text-input-highlight.component';
import { TextInputHighlightContainerDirective } from './text-input-highlight-container.directive';
import { TextInputElementDirective } from './text-input-element.directive';
import * as i0 from "@angular/core";
var TextInputHighlightModule = /** @class */ (function () {
    function TextInputHighlightModule() {
    }
    TextInputHighlightModule.ɵmod = i0.ɵɵdefineNgModule({ type: TextInputHighlightModule });
    TextInputHighlightModule.ɵinj = i0.ɵɵdefineInjector({ factory: function TextInputHighlightModule_Factory(t) { return new (t || TextInputHighlightModule)(); }, imports: [[CommonModule]] });
    return TextInputHighlightModule;
}());
export { TextInputHighlightModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TextInputHighlightModule, { declarations: [TextInputHighlightComponent,
        TextInputHighlightContainerDirective,
        TextInputElementDirective], imports: [CommonModule], exports: [TextInputHighlightComponent,
        TextInputHighlightContainerDirective,
        TextInputElementDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TextInputHighlightModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    TextInputHighlightComponent,
                    TextInputHighlightContainerDirective,
                    TextInputElementDirective
                ],
                imports: [CommonModule],
                exports: [
                    TextInputHighlightComponent,
                    TextInputHighlightContainerDirective,
                    TextInputElementDirective
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=text-input-highlight.module.js.map