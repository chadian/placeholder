var element_width_px_height_px = document.getElementById('vanilla-width-px-height-px');
var placeholder_width_px_height_px_element = new PlaceholderVanilla(element_width_px_height_px, {
	width: '450px',
	height: '235px'
}).applyDimensions();

var element_width_per_height_per = document.getElementById('vanilla-width-per-height-per');
var placeholder_width_per_height_per = new PlaceholderVanilla(element_width_per_height_per, {
	width: '30%',
	height: '150%'
}).applyDimensions();

var element_width_px_height_per = document.getElementById('vanilla-width-px-height-per');
var placeholder_width_px_height_per = new PlaceholderVanilla(element_width_px_height_per, {
	width: '600px',
	height: '50%'
}).applyDimensions();

var element_width_per_height_px = document.getElementById('vanilla-width-per-height-px');
var placeholder_width_per_height_px = new PlaceholderVanilla(element_width_per_height_px, {
	width: '80%',
	height: '200px'
}).applyDimensions();

var element_ratio_only = document.getElementById('vanilla-ratio-only');
var placeholder_element_ratio_only = new PlaceholderVanilla(element_ratio_only, {
	ratio: 0.35
}).applyDimensions();

var element_ratio_with_width_px = document.getElementById('vanilla-ratio-with-width-px');
var placeholder_ratio_with_width_px = new PlaceholderVanilla(element_ratio_with_width_px, {
	width: '350px',
	ratio: 1.25
}).applyDimensions();

var element_ratio_with_width_per = document.getElementById('vanilla-ratio-with-width-per');
var placeholder_ratio_with_width_per = new PlaceholderVanilla(element_ratio_with_width_per, {
	width: '45%',
	ratio: 1
}).applyDimensions();