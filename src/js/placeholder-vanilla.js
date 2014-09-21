"use strict";

var PlaceholderVanilla = (function() {


	/*
		Constructor & init
	*/
	var placeholder = function(element, options) {
		
		this.DEFAULT_FORCED_UNITS = 'px';
		this.RATIO_HEIGHT_ELEMENT_CLASS = 'ratio-height';
			
		// Ensure we're dealing with a DOM element
		if (!(element instanceof Node)) {
			throw "Element passed in is not a DOM element";
		}

		this.options = options;
		this.element = element;

		this.widthMeasure = this.parseMeasure(this.options.width);
		this.heightMeasure = this.parseMeasure(this.options.height);

		this.widthMeasure.units = this.widthMeasure.units || this.DEFAULT_FORCED_UNITS;
		this.heightMeasure.units = this.heightMeasure.units || this.DEFAULT_FORCED_UNITS;

	}

	/*
		Prototype & methods
	*/
	placeholder.prototype = {

		'parseMeasure': function(measure){
			
			var parsed = {
				'number': null,
				'units': null
			};

			if (typeof measure == 'string') {
				
				parsed.number = parseFloat(measure);
				
				var regex_units = /(px|%)$/i; // get pixels or percent from end of the string, ignore case
				var result = regex_units.exec(measure);
				parsed.units = result[0];

			} else if (typeof measure == 'number') {
				parsed.number = parseFloat(measure);
			}

			return parsed;
		},
		
		'shouldUseRatio' : function() {

			if (typeof this.options.useRatio == 'boolean') {
				return this.options.useRatio;

			} else if ('ratio' in this.options) {
				return true;

			} else if (this.heightMeasure.units == '%') {
				return true;

			} else {
				return false;

			}
			
		},

		'calculateHeightToWidthRatio': function(widthMeasure, heightMeasure) {

			if ('ratio' in this.options && typeof this.options.ratio == 'number') {
				return parseFloat(this.options.ratio);
			} else if (heightMeasure.units == '%') {
				return (heightMeasure.number / 100);
			} else if (widthMeasure.units == heightMeasure.units) {
				return heightMeasure.number / widthMeasure.number;
			} else {
				return null;
			}
		},
		
		'setWidthHeightDimensions': function(widthMeasure, heightMeasure) {

			if (widthMeasure.number) {
				this.element.style.width = widthMeasure.number + widthMeasure.units;
			}

			if (heightMeasure.number) {
				this.element.style.height = heightMeasure.number + heightMeasure.units;
			}
			
		},

		'setRatioDimensions': function(widthMeasure, ratioElement) {
			if (widthMeasure.number) {
				this.element.style.width = widthMeasure.number + widthMeasure.units;
			}

			this.element.appendChild(ratioElement);
		},

		'getInnerRatioElement': function(ratio) {
			var ratioElement = document.createElement('div');
			ratioElement.setAttribute('class', this.RATIO_HEIGHT_ELEMENT_CLASS);
			ratioElement.style.width = 0;
			ratioElement.style.paddingTop = (ratio * 100) + '%';
			ratioElement.style.display = 'inline_block';
			ratioElement.style.verticalAlign = 'middle';

			return ratioElement;
		},
		
		'destroyExistingRatioElement': function() {
			var destroyQueue = this.element.getElementsByClassName(this.RATIO_HEIGHT_ELEMENT_CLASS);
			
			for (var element in destroyQueue) {
				if (element instanceof Node) {
					element.parentNode.removeChild(element);	
				}
			}
		},

		'applyDimensions': function() {
			
			this.destroyExistingRatioElement();

			if (this.shouldUseRatio()) {

				var ratio = this.calculateHeightToWidthRatio(this.widthMeasure, this.heightMeasure);

				if (ratio) {
					var ratioElement = this.getInnerRatioElement(ratio);
					this.setRatioDimensions(this.widthMeasure, ratioElement);
				} else {
					throw "Unable to calculate ratio based on given units. Please ensure that width and height units match, or that height is a percentage";
				}

			} else {
				this.setWidthHeightDimensions(this.widthMeasure, this.heightMeasure);
			}
		}
	};

	return placeholder;

}());

