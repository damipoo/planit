'use strict';

/**
 * Static placeholder elements.
 *
 * @type {Object}
 */
var PLACEHOLDERS = {
  LI:  document.createElement('li'),
  DIV: document.createElement('div')
};

// Set the placeholder class name for styling.
PLACEHOLDERS.LI.className  = 'draggable-placeholder list-group-item';
PLACEHOLDERS.DIV.className = 'draggable-placeholder';

/**
 * Get the index of an element in an array-like structure.
 *
 * @param {Array}  arr
 * @param {*}      el
 *
 * @returns {Number}
 */
var indexOf = function (arr, el) {
  return Array.prototype.slice.call(arr).indexOf(el);
};

/**
 * Prevent default event execution.
 *
 * @param {Object} e
 */
var preventDefault = function (e) {
  e.preventDefault();
};

/**
 * Attach a new Angular directive to handle draggable lists.
 */
angular.module('planItApp')
  .directive('piDraggable', function () {
    return function (scope, element, attrs) {
      var el          = element[0];
      var isDragging  = false;
      var placeholder = PLACEHOLDERS[el.tagName === 'LI' ? 'LI' : 'DIV'];

      // Set the element to be HTML5 draggable.
      el.draggable = true;

      /**
       * Listen for various drag events on sibling.
       */
      var dragging = function () {
        if (!isDragging) {
          isDragging       = true;
          el.style.display = 'none';
        }

        var insertion = this;
        var siblings  = this.parentNode.children;

        // If the current hover element is larger than the current
        // placeholder position, move insertion to after the element.
        if (indexOf(siblings, this) > indexOf(siblings, placeholder)) {
          insertion = this.nextSibling;
        }

        this.parentNode.insertBefore(placeholder, insertion);        
      };

      /**
       * Handle moving the element.
       */
      var drop = function () {
        var newIndex = indexOf(el.parentNode.children, placeholder);
        // Take into account the current hidden element index.
        if (newIndex > scope.$index) {
          newIndex -= 1;
        }

        // Avoid triggering a sort event when nothing has moved.
        if (newIndex === scope.$index) {
          return;
        }

        scope.$apply(function () {
          scope[attrs.apDraggable || 'onDrag'](scope.$index, newIndex);
        });
      };

      /**
       * Listen for the initial drag event.
       *
       * @param {Object} e
       */
      element.on('dragstart', function (e) {
        var dataTransfer = e.originalEvent.dataTransfer;
        var style        = window.getComputedStyle(el);

        placeholder.style.height       = el.clientHeight + 'px';
        placeholder.style.marginTop    = style.marginTop;
        placeholder.style.marginBottom = style.marginBottom;

        dataTransfer.effectAllowed = 'move';
        dataTransfer.setData('Text', '*');

        element.parent().on('drop', drop);
        element.parent().children().on('dragover', dragging);
        angular.element(placeholder).on('dragover', preventDefault);
      });

      /**
       * Listen for the final drag ending event.
       */
      element.on('dragend', function () {
        isDragging       = false;
        el.style.display = null;

        if (placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }

        element.parent().off('drop', drop);
        element.parent().children().off('dragover', dragging);
        angular.element(placeholder).off('dragover', preventDefault);
      });
    };
  });
