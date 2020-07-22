const Scene = require('Scene');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Patches = require('Patches');

const rectangle = Scene.root.findFirst('rectangle0');
const slider = NativeUI.slider;
const picker = NativeUI.picker;

const index = 0;

var Brightness,
    Contrast,
    Hue,
    Saturation,
    Lightness;

var currenteffect = 'brightness'; 

const configuration = {

    selectedIndex: index,

    items: [
        { image_texture: Textures.get('brightness') },
        { image_texture: Textures.get('contrast') },
        { image_texture: Textures.get('hue') },
        { image_texture: Textures.get('saturation') },
        { image_texture: Textures.get('lightness') }
    ],

    effects: [
        { var: 'brightness'},
        { var: 'contras'},
        { var: 'hue'},
        { var: 'saturation'},
        { var: 'lightness'}
    ],

    valuestopatcheditor: [
        { var: 'B'},
        { var: 'C'},
        { var: 'H'},
        { var: 'S'},
        { var: 'L'},
    ]
};

picker.configure(configuration);
picker.visible = true;


picker.selectedIndex.monitor().subscribe(function (val)
{
    currenteffect = configuration.effects[val.newValue].var;
    switch (currenteffect) {
        case 'brightness':
            slider.value = Brightness;
            break;
        case 'contras':
            slider.value = Contrast;
            break;
        case 'hue':
            slider.value = Hue;
            break;
        case 'saturation':
            slider.value = Saturation;
            break;
        case 'lightness':
            slider.value = Lightness;
            break;
    }
});



slider.value.monitor({fireOnInitialValue: false}).subscribe(function (mod)
{
    var val = mod.newValue;
    switch (currenteffect)
    {
        case 'brightness':
            Patches.inputs.setScalar('B', val);
            Brightness = val;
            break;
        case 'contras':
            Patches.inputs.setScalar('C', val);
            Contrast = val;
            break;
        case 'hue':
            Patches.inputs.setScalar('H', val);
            Hue = val;
            break;
        case 'saturation':
            Patches.inputs.setScalar('S', val);
            Saturation = val;
            break;
        case 'lightness':
            Patches.inputs.setScalar('L', val);
            Lightness = val;
            break;
    }
});

slider.visible = true;

function start() {
    Patches.inputs.setScalar('B', 0.5);
    Patches.inputs.setScalar('C', 0.167);
    Patches.inputs.setScalar('H', 0.5);
    Patches.inputs.setScalar('S', 0);
    Patches.inputs.setScalar('L', 0);
    Brightness = 0.5;
    Contrast = 0.167;
    Hue = 0.5;
    Saturation = 0;
    Lightness = 0;
}

start();