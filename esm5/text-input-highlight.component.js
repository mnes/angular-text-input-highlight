import { __decorate, __read, __spread } from "tslib";
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
var styleProperties = Object.freeze([
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
]);
var tagIndexIdPrefix = 'text-highlight-tag-id-';
function indexIsInsideTag(index, tag) {
    return tag.indices.start < index && index < tag.indices.end;
}
function overlaps(tagA, tagB) {
    return (indexIsInsideTag(tagB.indices.start, tagA) ||
        indexIsInsideTag(tagB.indices.end, tagA));
}
function isCoordinateWithinRect(rect, x, y) {
    return rect.left < x && x < rect.right && (rect.top < y && y < rect.bottom);
}
function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var TextInputHighlightComponent = /** @class */ (function () {
    function TextInputHighlightComponent(renderer, cdr) {
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * The CSS class to add to highlighted tags
         */
        this.tagCssClass = '';
        /**
         * An array of indices of the textarea value to highlight
         */
        this.tags = [];
        /**
         * Called when the area over a tag is clicked
         */
        this.tagClick = new EventEmitter();
        /**
         * Called when the area over a tag is moused over
         */
        this.tagMouseEnter = new EventEmitter();
        /**
         * Called when the area over the tag has the mouse is removed from it
         */
        this.tagMouseLeave = new EventEmitter();
        /**
         * @private
         */
        this.highlightElementContainerStyle = {};
        this.textareaEventListeners = [];
        this.isDestroyed = false;
    }
    /**
     * Manually call this function to refresh the highlight element if the textarea styles have changed
     */
    TextInputHighlightComponent.prototype.refresh = function () {
        var _this = this;
        var computed = getComputedStyle(this.textInputElement);
        styleProperties.forEach(function (prop) {
            _this.highlightElementContainerStyle[prop] = computed[prop];
        });
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.ngOnChanges = function (changes) {
        if (changes.textInputElement) {
            this.textInputElementChanged();
        }
        if (changes.tags || changes.tagCssClass || changes.textInputValue) {
            this.addTags();
        }
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.textareaEventListeners.forEach(function (unregister) { return unregister(); });
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.onWindowResize = function () {
        this.refresh();
    };
    TextInputHighlightComponent.prototype.textInputElementChanged = function () {
        var _this = this;
        var elementType = this.textInputElement.tagName.toLowerCase();
        if (elementType !== 'textarea') {
            throw new Error('The angular-text-input-highlight component must be passed ' +
                'a textarea to the `textInputElement` input. Instead received a ' +
                elementType);
        }
        setTimeout(function () {
            // in case the element was destroyed before the timeout fires
            if (!_this.isDestroyed) {
                _this.refresh();
                _this.textareaEventListeners.forEach(function (unregister) { return unregister(); });
                _this.textareaEventListeners = [
                    _this.renderer.listen(_this.textInputElement, 'input', function () {
                        _this.addTags();
                    }),
                    _this.renderer.listen(_this.textInputElement, 'scroll', function () {
                        _this.highlightElement.nativeElement.scrollTop = _this.textInputElement.scrollTop;
                        _this.highlightTagElements = _this.highlightTagElements.map(function (tag) {
                            tag.clientRect = tag.element.getBoundingClientRect();
                            return tag;
                        });
                    }),
                    _this.renderer.listen(_this.textInputElement, 'mouseup', function () {
                        _this.refresh();
                    })
                ];
                // only add event listeners if the host component actually asks for it
                if (_this.tagClick.observers.length > 0) {
                    var onClick = _this.renderer.listen(_this.textInputElement, 'click', function (event) {
                        _this.handleTextareaMouseEvent(event, 'click');
                    });
                    _this.textareaEventListeners.push(onClick);
                }
                if (_this.tagMouseEnter.observers.length > 0) {
                    var onMouseMove = _this.renderer.listen(_this.textInputElement, 'mousemove', function (event) {
                        _this.handleTextareaMouseEvent(event, 'mousemove');
                    });
                    var onMouseLeave = _this.renderer.listen(_this.textInputElement, 'mouseleave', function (event) {
                        if (_this.mouseHoveredTag) {
                            _this.tagMouseLeave.emit(_this.mouseHoveredTag);
                            _this.mouseHoveredTag = undefined;
                        }
                    });
                    _this.textareaEventListeners.push(onMouseMove);
                    _this.textareaEventListeners.push(onMouseLeave);
                }
                _this.addTags();
            }
        });
    };
    TextInputHighlightComponent.prototype.addTags = function () {
        var _this = this;
        var textInputValue = typeof this.textInputValue !== 'undefined'
            ? this.textInputValue
            : this.textInputElement.value;
        var prevTags = [];
        var parts = [];
        __spread(this.tags).sort(function (tagA, tagB) {
            return tagA.indices.start - tagB.indices.start;
        })
            .forEach(function (tag) {
            if (tag.indices.start > tag.indices.end) {
                throw new Error("Highlight tag with indices [" + tag.indices.start + ", " + tag.indices
                    .end + "] cannot start after it ends.");
            }
            prevTags.forEach(function (prevTag) {
                if (overlaps(prevTag, tag)) {
                    throw new Error("Highlight tag with indices [" + tag.indices.start + ", " + tag.indices
                        .end + "] overlaps with tag [" + prevTag.indices.start + ", " + prevTag
                        .indices.end + "]");
                }
            });
            // TODO - implement this as an ngFor of items that is generated in the template for a cleaner solution
            var expectedTagLength = tag.indices.end - tag.indices.start;
            var tagContents = textInputValue.slice(tag.indices.start, tag.indices.end);
            if (tagContents.length === expectedTagLength) {
                var previousIndex = prevTags.length > 0 ? prevTags[prevTags.length - 1].indices.end : 0;
                var before_1 = textInputValue.slice(previousIndex, tag.indices.start);
                parts.push(escapeHtml(before_1));
                var cssClass = tag.cssClass || _this.tagCssClass;
                var tagId = tagIndexIdPrefix + _this.tags.indexOf(tag);
                // text-highlight-tag-id-${id} is used instead of a data attribute to prevent an angular sanitization warning
                parts.push("<span class=\"text-highlight-tag " + tagId + " " + cssClass + "\">" + escapeHtml(tagContents) + "</span>");
                prevTags.push(tag);
            }
        });
        var remainingIndex = prevTags.length > 0 ? prevTags[prevTags.length - 1].indices.end : 0;
        var remaining = textInputValue.slice(remainingIndex);
        parts.push(escapeHtml(remaining));
        parts.push('&nbsp;');
        this.highlightedText = parts.join('');
        this.cdr.detectChanges();
        this.highlightTagElements = Array.from(this.highlightElement.nativeElement.getElementsByTagName('span')).map(function (element) {
            return { element: element, clientRect: element.getBoundingClientRect() };
        });
    };
    TextInputHighlightComponent.prototype.handleTextareaMouseEvent = function (event, eventName) {
        var matchingTagIndex = this.highlightTagElements.findIndex(function (elm) {
            return isCoordinateWithinRect(elm.clientRect, event.clientX, event.clientY);
        });
        if (matchingTagIndex > -1) {
            var target = this.highlightTagElements[matchingTagIndex].element;
            var tagClass = Array.from(target.classList).find(function (className) {
                return className.startsWith(tagIndexIdPrefix);
            });
            if (tagClass) {
                var tagId = tagClass.replace(tagIndexIdPrefix, '');
                var tag = this.tags[+tagId];
                var tagMouseEvent = { tag: tag, target: target, event: event };
                if (eventName === 'click') {
                    this.tagClick.emit(tagMouseEvent);
                }
                else if (!this.mouseHoveredTag) {
                    this.mouseHoveredTag = tagMouseEvent;
                    this.tagMouseEnter.emit(tagMouseEvent);
                }
            }
        }
        else if (eventName === 'mousemove' && this.mouseHoveredTag) {
            this.mouseHoveredTag.event = event;
            this.tagMouseLeave.emit(this.mouseHoveredTag);
            this.mouseHoveredTag = undefined;
        }
    };
    TextInputHighlightComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], TextInputHighlightComponent.prototype, "tagCssClass", void 0);
    __decorate([
        Input()
    ], TextInputHighlightComponent.prototype, "tags", void 0);
    __decorate([
        Input()
    ], TextInputHighlightComponent.prototype, "textInputElement", void 0);
    __decorate([
        Input()
    ], TextInputHighlightComponent.prototype, "textInputValue", void 0);
    __decorate([
        Output()
    ], TextInputHighlightComponent.prototype, "tagClick", void 0);
    __decorate([
        Output()
    ], TextInputHighlightComponent.prototype, "tagMouseEnter", void 0);
    __decorate([
        Output()
    ], TextInputHighlightComponent.prototype, "tagMouseLeave", void 0);
    __decorate([
        ViewChild('highlightElement', { static: true })
    ], TextInputHighlightComponent.prototype, "highlightElement", void 0);
    __decorate([
        HostListener('window:resize')
    ], TextInputHighlightComponent.prototype, "onWindowResize", null);
    TextInputHighlightComponent = __decorate([
        Component({
            selector: 'mwl-text-input-highlight',
            template: "\n    <div\n      class=\"text-highlight-element\"\n      [ngStyle]=\"highlightElementContainerStyle\"\n      [innerHtml]=\"highlightedText\"\n      #highlightElement>\n    </div>\n  "
        })
    ], TextInputHighlightComponent);
    return TextInputHighlightComponent;
}());
export { TextInputHighlightComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1oaWdobGlnaHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWhpZ2hsaWdodC8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtaGlnaGxpZ2h0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDcEMsV0FBVztJQUNYLFdBQVc7SUFDWCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFdBQVc7SUFDWCxXQUFXO0lBRVgsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLGFBQWE7SUFFYixZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7SUFDZixhQUFhO0lBRWIsd0RBQXdEO0lBQ3hELFdBQVc7SUFDWCxhQUFhO0lBQ2IsWUFBWTtJQUNaLGFBQWE7SUFDYixVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixZQUFZO0lBRVosV0FBVztJQUNYLGVBQWU7SUFDZixZQUFZO0lBQ1osZ0JBQWdCO0lBRWhCLGVBQWU7SUFDZixhQUFhO0lBRWIsU0FBUztJQUNULFlBQVk7Q0FDYixDQUFDLENBQUM7QUFFSCxJQUFNLGdCQUFnQixHQUFHLHdCQUF3QixDQUFDO0FBRWxELFNBQVMsZ0JBQWdCLENBQUMsS0FBYSxFQUFFLEdBQWlCO0lBQ3hELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUM5RCxD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SUFLdEM7UUFBUixLQUFLLEVBQUU7dUVBQXdCO0lBS3RCO1FBQVQsTUFBTSxFQUFFO2lFQUE4QztJQUs3QztRQUFULE1BQU0sRUFBRTtzRUFBbUQ7SUFLbEQ7UUFBVCxNQUFNLEVBQUU7c0VBQW1EO0lBWVg7UUFBaEQsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3lFQUFzQztJQWtEdEY7UUFEQyxZQUFZLENBQUMsZUFBZSxDQUFDO3FFQUc3QjtJQWxHVSwyQkFBMkI7UUFYdkMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxRQUFRLEVBQUUseUxBT1Q7U0FDRixDQUFDO09BQ1csMkJBQTJCLENBNFF2QztJQUFELGtDQUFDO0NBQUEsQUE1UUQsSUE0UUM7U0E1UVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhpZ2hsaWdodFRhZyB9IGZyb20gJy4vaGlnaGxpZ2h0LXRhZy5pbnRlcmZhY2UnO1xuXG5jb25zdCBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3QuZnJlZXplKFtcbiAgJ2RpcmVjdGlvbicsIC8vIFJUTCBzdXBwb3J0XG4gICdib3hTaXppbmcnLFxuICAnd2lkdGgnLCAvLyBvbiBDaHJvbWUgYW5kIElFLCBleGNsdWRlIHRoZSBzY3JvbGxiYXIsIHNvIHRoZSBtaXJyb3IgZGl2IHdyYXBzIGV4YWN0bHkgYXMgdGhlIHRleHRhcmVhIGRvZXNcbiAgJ2hlaWdodCcsXG4gICdvdmVyZmxvd1gnLFxuICAnb3ZlcmZsb3dZJywgLy8gY29weSB0aGUgc2Nyb2xsYmFyIGZvciBJRVxuXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdib3JkZXJTdHlsZScsXG5cbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAncGFkZGluZ0xlZnQnLFxuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9mb250XG4gICdmb250U3R5bGUnLFxuICAnZm9udFZhcmlhbnQnLFxuICAnZm9udFdlaWdodCcsXG4gICdmb250U3RyZXRjaCcsXG4gICdmb250U2l6ZScsXG4gICdmb250U2l6ZUFkanVzdCcsXG4gICdsaW5lSGVpZ2h0JyxcbiAgJ2ZvbnRGYW1pbHknLFxuXG4gICd0ZXh0QWxpZ24nLFxuICAndGV4dFRyYW5zZm9ybScsXG4gICd0ZXh0SW5kZW50JyxcbiAgJ3RleHREZWNvcmF0aW9uJywgLy8gbWlnaHQgbm90IG1ha2UgYSBkaWZmZXJlbmNlLCBidXQgYmV0dGVyIGJlIHNhZmVcblxuICAnbGV0dGVyU3BhY2luZycsXG4gICd3b3JkU3BhY2luZycsXG5cbiAgJ3RhYlNpemUnLFxuICAnTW96VGFiU2l6ZSdcbl0pO1xuXG5jb25zdCB0YWdJbmRleElkUHJlZml4ID0gJ3RleHQtaGlnaGxpZ2h0LXRhZy1pZC0nO1xuXG5mdW5jdGlvbiBpbmRleElzSW5zaWRlVGFnKGluZGV4OiBudW1iZXIsIHRhZzogSGlnaGxpZ2h0VGFnKSB7XG4gIHJldHVybiB0YWcuaW5kaWNlcy5zdGFydCA8IGluZGV4ICYmIGluZGV4IDwgdGFnLmluZGljZXMuZW5kO1xufVxuXG5mdW5jdGlvbiBvdmVybGFwcyh0YWdBOiBIaWdobGlnaHRUYWcsIHRhZ0I6IEhpZ2hsaWdodFRhZykge1xuICByZXR1cm4gKFxuICAgIGluZGV4SXNJbnNpZGVUYWcodGFnQi5pbmRpY2VzLnN0YXJ0LCB0YWdBKSB8fFxuICAgIGluZGV4SXNJbnNpZGVUYWcodGFnQi5pbmRpY2VzLmVuZCwgdGFnQSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNDb29yZGluYXRlV2l0aGluUmVjdChyZWN0OiBDbGllbnRSZWN0LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICByZXR1cm4gcmVjdC5sZWZ0IDwgeCAmJiB4IDwgcmVjdC5yaWdodCAmJiAocmVjdC50b3AgPCB5ICYmIHkgPCByZWN0LmJvdHRvbSk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFnTW91c2VFdmVudCB7XG4gIHRhZzogSGlnaGxpZ2h0VGFnO1xuICB0YXJnZXQ6IEhUTUxFbGVtZW50O1xuICBldmVudDogTW91c2VFdmVudDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtaGlnaGxpZ2h0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInRleHQtaGlnaGxpZ2h0LWVsZW1lbnRcIlxuICAgICAgW25nU3R5bGVdPVwiaGlnaGxpZ2h0RWxlbWVudENvbnRhaW5lclN0eWxlXCJcbiAgICAgIFtpbm5lckh0bWxdPVwiaGlnaGxpZ2h0ZWRUZXh0XCJcbiAgICAgICNoaWdobGlnaHRFbGVtZW50PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEhpZ2hsaWdodENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBDU1MgY2xhc3MgdG8gYWRkIHRvIGhpZ2hsaWdodGVkIHRhZ3NcbiAgICovXG4gIEBJbnB1dCgpIHRhZ0Nzc0NsYXNzOiBzdHJpbmcgPSAnJztcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgaW5kaWNlcyBvZiB0aGUgdGV4dGFyZWEgdmFsdWUgdG8gaGlnaGxpZ2h0XG4gICAqL1xuICBASW5wdXQoKSB0YWdzOiBIaWdobGlnaHRUYWdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgdGV4dGFyZWEgdG8gaGlnaGxpZ2h0XG4gICAqL1xuICBASW5wdXQoKSB0ZXh0SW5wdXRFbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgdGV4dGFyZWEgdmFsdWUsIGluIG5vdCBwcm92aWRlZCB3aWxsIGZhbGwgYmFjayB0byB0cnlpbmcgdG8gZ3JhYiBpdCBhdXRvbWF0aWNhbGx5IGZyb20gdGhlIHRleHRhcmVhXG4gICAqL1xuICBASW5wdXQoKSB0ZXh0SW5wdXRWYWx1ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgYXJlYSBvdmVyIGEgdGFnIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSB0YWdDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnTW91c2VFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGFyZWEgb3ZlciBhIHRhZyBpcyBtb3VzZWQgb3ZlclxuICAgKi9cbiAgQE91dHB1dCgpIHRhZ01vdXNlRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBhcmVhIG92ZXIgdGhlIHRhZyBoYXMgdGhlIG1vdXNlIGlzIHJlbW92ZWQgZnJvbSBpdFxuICAgKi9cbiAgQE91dHB1dCgpIHRhZ01vdXNlTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ01vdXNlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoaWdobGlnaHRFbGVtZW50Q29udGFpbmVyU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhpZ2hsaWdodGVkVGV4dDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2hpZ2hsaWdodEVsZW1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIGhpZ2hsaWdodEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSB0ZXh0YXJlYUV2ZW50TGlzdGVuZXJzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gIHByaXZhdGUgaGlnaGxpZ2h0VGFnRWxlbWVudHM6IEFycmF5PHtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBjbGllbnRSZWN0OiBDbGllbnRSZWN0O1xuICB9PjtcblxuICBwcml2YXRlIG1vdXNlSG92ZXJlZFRhZzogVGFnTW91c2VFdmVudCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGlzRGVzdHJveWVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBjYWxsIHRoaXMgZnVuY3Rpb24gdG8gcmVmcmVzaCB0aGUgaGlnaGxpZ2h0IGVsZW1lbnQgaWYgdGhlIHRleHRhcmVhIHN0eWxlcyBoYXZlIGNoYW5nZWRcbiAgICovXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgY29tcHV0ZWQ6IGFueSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy50ZXh0SW5wdXRFbGVtZW50KTtcbiAgICBzdHlsZVByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0RWxlbWVudENvbnRhaW5lclN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy50ZXh0SW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHRJbnB1dEVsZW1lbnRDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMudGFncyB8fCBjaGFuZ2VzLnRhZ0Nzc0NsYXNzIHx8IGNoYW5nZXMudGV4dElucHV0VmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVGFncygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgdGhpcy50ZXh0YXJlYUV2ZW50TGlzdGVuZXJzLmZvckVhY2godW5yZWdpc3RlciA9PiB1bnJlZ2lzdGVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwcml2YXRlIHRleHRJbnB1dEVsZW1lbnRDaGFuZ2VkKCkge1xuICAgIGNvbnN0IGVsZW1lbnRUeXBlID0gdGhpcy50ZXh0SW5wdXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoZWxlbWVudFR5cGUgIT09ICd0ZXh0YXJlYScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSBhbmd1bGFyLXRleHQtaW5wdXQtaGlnaGxpZ2h0IGNvbXBvbmVudCBtdXN0IGJlIHBhc3NlZCAnICtcbiAgICAgICAgJ2EgdGV4dGFyZWEgdG8gdGhlIGB0ZXh0SW5wdXRFbGVtZW50YCBpbnB1dC4gSW5zdGVhZCByZWNlaXZlZCBhICcgK1xuICAgICAgICBlbGVtZW50VHlwZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGluIGNhc2UgdGhlIGVsZW1lbnQgd2FzIGRlc3Ryb3llZCBiZWZvcmUgdGhlIHRpbWVvdXQgZmlyZXNcbiAgICAgIGlmICghdGhpcy5pc0Rlc3Ryb3llZCkge1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgICAgICB0aGlzLnRleHRhcmVhRXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCh1bnJlZ2lzdGVyID0+IHVucmVnaXN0ZXIoKSk7XG4gICAgICAgIHRoaXMudGV4dGFyZWFFdmVudExpc3RlbmVycyA9IFtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLnRleHRJbnB1dEVsZW1lbnQsICdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkVGFncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMudGV4dElucHV0RWxlbWVudCwgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0RWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMudGV4dElucHV0RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodFRhZ0VsZW1lbnRzID0gdGhpcy5oaWdobGlnaHRUYWdFbGVtZW50cy5tYXAodGFnID0+IHtcbiAgICAgICAgICAgICAgdGFnLmNsaWVudFJlY3QgPSB0YWcuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRhZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMudGV4dElucHV0RWxlbWVudCwgJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICB9KVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIG9ubHkgYWRkIGV2ZW50IGxpc3RlbmVycyBpZiB0aGUgaG9zdCBjb21wb25lbnQgYWN0dWFsbHkgYXNrcyBmb3IgaXRcbiAgICAgICAgaWYgKHRoaXMudGFnQ2xpY2sub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBvbkNsaWNrID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICB0aGlzLnRleHRJbnB1dEVsZW1lbnQsXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRleHRhcmVhTW91c2VFdmVudChldmVudCwgJ2NsaWNrJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnRleHRhcmVhRXZlbnRMaXN0ZW5lcnMucHVzaChvbkNsaWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhZ01vdXNlRW50ZXIub2JzZXJ2ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBvbk1vdXNlTW92ZSA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgdGhpcy50ZXh0SW5wdXRFbGVtZW50LFxuICAgICAgICAgICAgJ21vdXNlbW92ZScsXG4gICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGFuZGxlVGV4dGFyZWFNb3VzZUV2ZW50KGV2ZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgIHRoaXMudGV4dElucHV0RWxlbWVudCxcbiAgICAgICAgICAgICdtb3VzZWxlYXZlJyxcbiAgICAgICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubW91c2VIb3ZlcmVkVGFnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWdNb3VzZUxlYXZlLmVtaXQodGhpcy5tb3VzZUhvdmVyZWRUYWcpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VIb3ZlcmVkVGFnID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnRleHRhcmVhRXZlbnRMaXN0ZW5lcnMucHVzaChvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgdGhpcy50ZXh0YXJlYUV2ZW50TGlzdGVuZXJzLnB1c2gob25Nb3VzZUxlYXZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkVGFncygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRUYWdzKCkge1xuICAgIGNvbnN0IHRleHRJbnB1dFZhbHVlID1cbiAgICAgIHR5cGVvZiB0aGlzLnRleHRJbnB1dFZhbHVlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMudGV4dElucHV0VmFsdWVcbiAgICAgICAgOiB0aGlzLnRleHRJbnB1dEVsZW1lbnQudmFsdWU7XG5cbiAgICBjb25zdCBwcmV2VGFnczogSGlnaGxpZ2h0VGFnW10gPSBbXTtcbiAgICBjb25zdCBwYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIFsuLi50aGlzLnRhZ3NdXG4gICAgICAuc29ydCgodGFnQSwgdGFnQikgPT4ge1xuICAgICAgICByZXR1cm4gdGFnQS5pbmRpY2VzLnN0YXJ0IC0gdGFnQi5pbmRpY2VzLnN0YXJ0O1xuICAgICAgfSlcbiAgICAgIC5mb3JFYWNoKHRhZyA9PiB7XG4gICAgICAgIGlmICh0YWcuaW5kaWNlcy5zdGFydCA+IHRhZy5pbmRpY2VzLmVuZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBIaWdobGlnaHQgdGFnIHdpdGggaW5kaWNlcyBbJHt0YWcuaW5kaWNlcy5zdGFydH0sICR7dGFnLmluZGljZXNcbiAgICAgICAgICAgICAgLmVuZH1dIGNhbm5vdCBzdGFydCBhZnRlciBpdCBlbmRzLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldlRhZ3MuZm9yRWFjaChwcmV2VGFnID0+IHtcbiAgICAgICAgICBpZiAob3ZlcmxhcHMocHJldlRhZywgdGFnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgSGlnaGxpZ2h0IHRhZyB3aXRoIGluZGljZXMgWyR7dGFnLmluZGljZXMuc3RhcnR9LCAke3RhZy5pbmRpY2VzXG4gICAgICAgICAgICAgICAgLmVuZH1dIG92ZXJsYXBzIHdpdGggdGFnIFske3ByZXZUYWcuaW5kaWNlcy5zdGFydH0sICR7cHJldlRhZ1xuICAgICAgICAgICAgICAgICAgLmluZGljZXMuZW5kfV1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVE9ETyAtIGltcGxlbWVudCB0aGlzIGFzIGFuIG5nRm9yIG9mIGl0ZW1zIHRoYXQgaXMgZ2VuZXJhdGVkIGluIHRoZSB0ZW1wbGF0ZSBmb3IgYSBjbGVhbmVyIHNvbHV0aW9uXG5cbiAgICAgICAgY29uc3QgZXhwZWN0ZWRUYWdMZW5ndGggPSB0YWcuaW5kaWNlcy5lbmQgLSB0YWcuaW5kaWNlcy5zdGFydDtcbiAgICAgICAgY29uc3QgdGFnQ29udGVudHMgPSB0ZXh0SW5wdXRWYWx1ZS5zbGljZShcbiAgICAgICAgICB0YWcuaW5kaWNlcy5zdGFydCxcbiAgICAgICAgICB0YWcuaW5kaWNlcy5lbmRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRhZ0NvbnRlbnRzLmxlbmd0aCA9PT0gZXhwZWN0ZWRUYWdMZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBwcmV2aW91c0luZGV4ID1cbiAgICAgICAgICAgIHByZXZUYWdzLmxlbmd0aCA+IDAgPyBwcmV2VGFnc1twcmV2VGFncy5sZW5ndGggLSAxXS5pbmRpY2VzLmVuZCA6IDA7XG4gICAgICAgICAgY29uc3QgYmVmb3JlID0gdGV4dElucHV0VmFsdWUuc2xpY2UocHJldmlvdXNJbmRleCwgdGFnLmluZGljZXMuc3RhcnQpO1xuICAgICAgICAgIHBhcnRzLnB1c2goZXNjYXBlSHRtbChiZWZvcmUpKTtcbiAgICAgICAgICBjb25zdCBjc3NDbGFzcyA9IHRhZy5jc3NDbGFzcyB8fCB0aGlzLnRhZ0Nzc0NsYXNzO1xuICAgICAgICAgIGNvbnN0IHRhZ0lkID0gdGFnSW5kZXhJZFByZWZpeCArIHRoaXMudGFncy5pbmRleE9mKHRhZyk7XG4gICAgICAgICAgLy8gdGV4dC1oaWdobGlnaHQtdGFnLWlkLSR7aWR9IGlzIHVzZWQgaW5zdGVhZCBvZiBhIGRhdGEgYXR0cmlidXRlIHRvIHByZXZlbnQgYW4gYW5ndWxhciBzYW5pdGl6YXRpb24gd2FybmluZ1xuICAgICAgICAgIHBhcnRzLnB1c2goXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJ0ZXh0LWhpZ2hsaWdodC10YWcgJHt0YWdJZH0gJHtjc3NDbGFzc31cIj4ke2VzY2FwZUh0bWwoXG4gICAgICAgICAgICAgIHRhZ0NvbnRlbnRzXG4gICAgICAgICAgICApfTwvc3Bhbj5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwcmV2VGFncy5wdXNoKHRhZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGNvbnN0IHJlbWFpbmluZ0luZGV4ID1cbiAgICAgIHByZXZUYWdzLmxlbmd0aCA+IDAgPyBwcmV2VGFnc1twcmV2VGFncy5sZW5ndGggLSAxXS5pbmRpY2VzLmVuZCA6IDA7XG4gICAgY29uc3QgcmVtYWluaW5nID0gdGV4dElucHV0VmFsdWUuc2xpY2UocmVtYWluaW5nSW5kZXgpO1xuICAgIHBhcnRzLnB1c2goZXNjYXBlSHRtbChyZW1haW5pbmcpKTtcbiAgICBwYXJ0cy5wdXNoKCcmbmJzcDsnKTtcbiAgICB0aGlzLmhpZ2hsaWdodGVkVGV4dCA9IHBhcnRzLmpvaW4oJycpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmhpZ2hsaWdodFRhZ0VsZW1lbnRzID0gQXJyYXkuZnJvbTxIVE1MRWxlbWVudD4oXG4gICAgICB0aGlzLmhpZ2hsaWdodEVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpXG4gICAgKS5tYXAoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICByZXR1cm4geyBlbGVtZW50LCBjbGllbnRSZWN0OiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVRleHRhcmVhTW91c2VFdmVudChcbiAgICBldmVudDogTW91c2VFdmVudCxcbiAgICBldmVudE5hbWU6ICdjbGljaycgfCAnbW91c2Vtb3ZlJ1xuICApIHtcbiAgICBjb25zdCBtYXRjaGluZ1RhZ0luZGV4ID0gdGhpcy5oaWdobGlnaHRUYWdFbGVtZW50cy5maW5kSW5kZXgoZWxtID0+XG4gICAgICBpc0Nvb3JkaW5hdGVXaXRoaW5SZWN0KGVsbS5jbGllbnRSZWN0LCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKVxuICAgICk7XG4gICAgaWYgKG1hdGNoaW5nVGFnSW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5oaWdobGlnaHRUYWdFbGVtZW50c1ttYXRjaGluZ1RhZ0luZGV4XS5lbGVtZW50O1xuICAgICAgY29uc3QgdGFnQ2xhc3MgPSBBcnJheS5mcm9tKHRhcmdldC5jbGFzc0xpc3QpLmZpbmQoY2xhc3NOYW1lID0+XG4gICAgICAgIGNsYXNzTmFtZS5zdGFydHNXaXRoKHRhZ0luZGV4SWRQcmVmaXgpXG4gICAgICApO1xuICAgICAgaWYgKHRhZ0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IHRhZ0lkID0gdGFnQ2xhc3MucmVwbGFjZSh0YWdJbmRleElkUHJlZml4LCAnJyk7XG4gICAgICAgIGNvbnN0IHRhZzogSGlnaGxpZ2h0VGFnID0gdGhpcy50YWdzWyt0YWdJZF07XG4gICAgICAgIGNvbnN0IHRhZ01vdXNlRXZlbnQgPSB7IHRhZywgdGFyZ2V0LCBldmVudCB9O1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSAnY2xpY2snKSB7XG4gICAgICAgICAgdGhpcy50YWdDbGljay5lbWl0KHRhZ01vdXNlRXZlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm1vdXNlSG92ZXJlZFRhZykge1xuICAgICAgICAgIHRoaXMubW91c2VIb3ZlcmVkVGFnID0gdGFnTW91c2VFdmVudDtcbiAgICAgICAgICB0aGlzLnRhZ01vdXNlRW50ZXIuZW1pdCh0YWdNb3VzZUV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lID09PSAnbW91c2Vtb3ZlJyAmJiB0aGlzLm1vdXNlSG92ZXJlZFRhZykge1xuICAgICAgdGhpcy5tb3VzZUhvdmVyZWRUYWcuZXZlbnQgPSBldmVudDtcbiAgICAgIHRoaXMudGFnTW91c2VMZWF2ZS5lbWl0KHRoaXMubW91c2VIb3ZlcmVkVGFnKTtcbiAgICAgIHRoaXMubW91c2VIb3ZlcmVkVGFnID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19