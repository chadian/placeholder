var element_width_px_height_px = document.getElementById('vanilla-width-px-height-px');
var placeholder_width_px_height_px_element = new PlaceholderVanilla(element_width_px_height_px, {
	width: '300px',
	height: '125px'
}).applyDimensions();

var element_width_per_height_per = document.getElementById('vanilla-width-per-height-per');
var placeholder_width_per_height_per = new PlaceholderVanilla(element_width_per_height_per, {
	width: '50%',
	height: '35%'
}).applyDimensions();

var element_width_px_height_per = document.getElementById('vanilla-width-px-height-per');
var placeholder_width_px_height_per = new PlaceholderVanilla(element_width_px_height_per, {
	width: '200px',
	height: '50%'
}).applyDimensions();

var element_width_per_height_px = document.getElementById('vanilla-width-per-height-px');
var placeholder_width_per_height_px = new PlaceholderVanilla(element_width_per_height_px, {
	width: '25%',
	height: '200px'
}).applyDimensions();

var element_ratio_only = document.getElementById('vanilla-ratio-only');
var placeholder_element_ratio_only = new PlaceholderVanilla(element_ratio_only, {
	ratio: 0.35
}).applyDimensions();

var element_ratio_with_width_px = document.getElementById('vanilla-ratio-with-width-px');
var placeholder_ratio_with_width_px = new PlaceholderVanilla(element_ratio_with_width_px, {
	width: '150px',
	ratio: 0.65
}).applyDimensions();

var element_ratio_with_width_per = document.getElementById('vanilla-ratio-with-width-per');
var placeholder_ratio_with_width_per = new PlaceholderVanilla(element_ratio_with_width_per, {
	width: '25%',
	ratio: 0.35
}).applyDimensions();