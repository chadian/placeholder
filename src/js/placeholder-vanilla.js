"use strict";

var PlaceholderVanilla = (function() {


	/*
		Constructor & init
	*/
	var placeholder = function(element, options) {
		
		var DEFAULT_FORCED_UNITS = 'px';
			
		// Ensure we're dealing with a DOM element
		if (!(element instanceof Node)) {
			throw "Element passed in is not a DOM element";
		}

		this.options = options;
		this.element = element;

		this.widthMeasure = this.parseMeasure(this.options.width);
		this.heightMeasure = this.parseMeasure(this.options.height);

		this.widthMeasure.units = this.widthMeasure.units || DEFAULT_FORCED_UNITS;
		this.heightMeasure.units = this.heightMeasure.units || DEFAULT_FORCED_UNITS;

		this.applyDimensions();
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

		'setRatioDimensions': function(widthMeasure, ratio) {
			if (widthMeasure.number) {
				this.element.style.width = widthMeasure.number + widthMeasure.units;
			}

			var ratioElement = document.createElement('div');
			ratioElement.style.width = 0;
			ratioElement.style.paddingTop = (ratio * 100) + '%';
			ratioElement.style.display = 'inline_block';
			ratioElement.style.verticalAlign = 'middle';

			this.element.appendChild(ratioElement);
		},
		
		'applyDimensions': function() {
			
			if (this.shouldUseRatio()) {

				var ratio = this.calculateHeightToWidthRatio(this.widthMeasure, this.heightMeasure);
				console.log("RATIO " + ratio);
				if (ratio) {
					this.setRatioDimensions(this.widthMeasure, ratio);
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

var element_width_px_height_px = document.getElementById('vanilla-width-px-height-px');
var placeholder_width_px_height_px_element = new PlaceholderVanilla(element_width_px_height_px, {
	width: '300px',
	height: '125px'
});

var element_width_per_height_per = document.getElementById('vanilla-width-per-height-per');
var placeholder_width_per_height_per = new PlaceholderVanilla(element_width_per_height_per, {
	width: '50%',
	height: '35%'
});

var element_width_px_height_per = document.getElementById('vanilla-width-px-height-per');
var placeholder_width_px_height_per = new PlaceholderVanilla(element_width_px_height_per, {
	width: '200px',
	height: '50%'
});

var element_width_per_height_px = document.getElementById('vanilla-width-per-height-px');
var placeholder_width_per_height_px = new PlaceholderVanilla(element_width_per_height_px, {
	width: '25%',
	height: '200px'
});

var element_ratio_only = document.getElementById('vanilla-ratio-only');
var placeholder_element_ratio_only = new PlaceholderVanilla(element_ratio_only, {
	ratio: 0.35
});

var element_ratio_with_width_px = document.getElementById('vanilla-ratio-with-width-px');
var placeholder_ratio_with_width_px = new PlaceholderVanilla(element_ratio_with_width_px, {
	width: '150px',
	ratio: 0.65
});

var element_ratio_with_width_per = document.getElementById('vanilla-ratio-with-width-per');
var placeholder_ratio_with_width_per = new PlaceholderVanilla(element_ratio_with_width_per, {
	width: '25%',
	ratio: 0.35
});

