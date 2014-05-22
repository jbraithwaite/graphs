define(function(require, exports, module) {
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var Transitionable  = require('famous/transitions/Transitionable');
    var OptionsManager  = require('famous/core/OptionsManager');
    var Easing          = require('famous/transitions/Easing');
    // var EventHandler    = require('famous/core/EventHandler');

    function Bargraph (options) {
        this._dataLevels = [];
        this.options = Object.create(Bargraph.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);        
        if (options) this.setOptions(options);

        this._optionsManager.on('change', function (event) {
            console.log('setting option', event);
            switch(event.id) {
                case "backgroundColor":
                    this._background.setProperties({
                        backgroundColor: event.value
                    });
                    break;

                case "data": 
                    if (event.value instanceof Array) {
                        this.setOptions({
                            data: event.value,
                            barColor: 'orange'
                        });
                        this.initialize();
                    }
                    break;                    
            }
        }.bind(this));

        this.initialize();
    }

    Bargraph.STYLE_COL = 0;
    Bargraph.STYLE_ROW = 1;
    Bargraph.DEFAULT_OPTIONS = {
        direction: Bargraph.STYLE_COL,
        axisWidth: 1,
        axisPadding: 1,
        size: [500, 500],
        backgroundColor: 'darkgrey',
        gutterWidth: 1,
        barTransition: {curve : 'easeOutBounce', duration : 700},
        subTransition: {curve : 'linear', duration : 500},
        level: 0,
        data: []
    };

    Bargraph.prototype.initialize = function initialize() {
        if ((this._bars) && (this._bars.length >0)) {
            this.destroyBars();
        }
        this._bars = [];
        this._barHeights = [];
        this._maxBarHeight = 0;
        this._originalBarValues = [];
        this._scaleBar = [new Transitionable(1), new Transitionable(1), 1];
        this._barWidth = 0;
        this._barHeightRatio;
        this._dataLevels[this.options.level] = this.options.data;

        var numBars = this.options.data.length;

        // draw background
        this._background = new Surface({
            size: this.options.size,
            properties: {
                zIndex: 0,
                borderLeft: this.options.axisWidth + "px solid black",
                borderBottom: this.options.axisWidth + "px solid black",
                backgroundColor: this.options.backgroundColor
            }
        });

        // debugger;
        // calculate bar width
        if (this.options.direction === Bargraph.STYLE_COL) {
            this._barWidth = (this.options.size[0] - this.options.axisWidth - (this.options.axisPadding * 2) - (this.options.gutterWidth * (numBars - 1))) / numBars;
        }
        else {
            this._barWidth = (this.options.size[1] - (this.options.gutterWidth * (numBars - 1))) / numBars;
        }

        // find max bar height
        for (var i=0; i<numBars; i++) {
            if (this.options.data[i].value > this._maxBarHeight) {
                this._maxBarHeight = this.options.data[i].value;
            }
        }

        // calculate bar height ratio
        if (this.options.direction === Bargraph.STYLE_COL) {
            this._barHeightRatio = (this.options.size[1] - this.options.axisWidth - (this.options.axisPadding * 2)) / this._maxBarHeight;
        }
        else {
            this._barHeightRatio = this.options.size[0] / this._maxBarHeight;            
        }

       // draw bars
        var barSize;
        var self = this;
        for (var i=0; i<numBars; i++) {
            this._barHeights[i] = new Transitionable(1 / this.options.data[i].value);
            if (this.options.direction === Bargraph.STYLE_COL) {
                barSize = [this._barWidth, this.options.data[i].value * this._barHeightRatio]; 
            }
            else {
                barSize = [this.options.data[i].value * this._barHeightRatio, this._barWidth];
            }
            this._bars.push(new Surface({
                size: barSize,
                properties: {
                    index: i,
                    zIndex: 1,
                    // borderRadius: '5px',
                    clicked: false,
                    backgroundColor: this.options.barColor
                    // backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)"
                }
            }));

            // store original bar values for scaling purposes
            this._originalBarValues.push(barSize[1]);


            // add bar events
            this._bars[i].on("click", function () {
                self.options.eventHandler.emit('zoomIn', self._bars[this.getProperties().index].offset, this.getProperties().index);
                // var index = this.getProperties().index;
                // var subdata = self.options.data[index].subdata;
                // console.log('clicked on bar', this.getProperties().index, 'subdata:', self.options.data[index].subdata, 'level:', self.options.level);
                // if (self.options.data[index].subdata && (self.options.data[index].subdata.length > 0)) {
                //     this.setProperties({
                //         zIndex: 2,
                //         borderRadius: '0px',
                //         clicked: true
                //     });

                //     var xScale = self.options.size[0] / this.size[0];
                //     var yScale = self.options.size[1] / this.size[1];

                //     console.log(self.options.size[1], this.size[1], yScale);
                //     self._scaleBar[0].set(xScale, self.options.subTransition);
                //     self._scaleBar[1].set(yScale, self.options.subTransition, function() {
                //         self.setOptions({
                //             backgroundColor:  this.getProperties().backgroundColor,
                //             level: self.options.level + 1,
                //             data: subdata
                //         });
                //         self.start();
                //     }.bind(this));
                // }
            });
        }
    };

    Bargraph.prototype.adjustBars = function adjustBars() {
        for (var index=0; index<this.options.data.length; index++) {
            var originalValue = this._originalBarValues[index];
            this._barHeightRatio = (this.options.size[1] - this.options.axisWidth - (this.options.axisPadding * 2)) / this._maxBarHeight;
            var newValue = this.options.data[index].value * this._barHeightRatio;
            var scaleBy = newValue / originalValue;
            this._barHeights[index].set(scaleBy, this.options.barTransition);            
        }
    };

    Bargraph.prototype.destroyBars = function destroyBars() {
        this._bars = [];
    };

    Bargraph.prototype.setOptions = function setOptions(options) {
        return this._optionsManager.setOptions(options);
    };

    Bargraph.prototype.start = function start() {
        for (var i=0; i<this.options.data.length; i++) {
            this.animateBar(i);
        }
        return this;
    };

    Bargraph.prototype.addItem = function addItem (item) {
        if (item.value === undefined) return;
        var index = this.options.data.length;
        var barSize = [this._barWidth, item.value * this._barHeightRatio];         
        this.options.data[index] = item;
        this._bars.push(new Surface({
            size: barSize,
            properties: {
                index: index,
                zIndex: 1,
                borderRadius: '5px',
                clicked: false,
                backgroundColor: this.options.barColor
                // backgroundColor: "hsl(" + (index * 360 / 10) + ", 100%, 50%)"
            }
        }));
        this._barHeights.push(new Transitionable(1 / item.value));
        this._originalBarValues.push(barSize[1]);
        this.animateBar(index);
    };

    Bargraph.prototype.setItemValue = function setItemValue (index, value) {
        if (value === undefined) return;
        if ((index < 0) || (index > this.options.data.length -1)) return;

        var originalValue = this._originalBarValues[index];
        this._barHeightRatio = this.options.size[1] / this._maxBarHeight;
        var newValue = this.options.data[index].value = value; 

        if (value > this._maxBarHeight) {
            this._maxBarHeight = value;
        }
        this.adjustBars();
    };

    Bargraph.prototype.backOneLevel = function backOneLevel() {
        if (this.options.level === 0) return;
        this.destroyBars();
        this.addHidingPane = true;
        this.setOptions({
            data: this._dataLevels[this.options.level -1],
            level: this.options.level - 1,
            backgroundColor: '',
            barColor: this._background.getProperties().backgroundColor
        });
        this.initialize();
        this.addHidingPane = false;
        this.start();
    };

    Bargraph.prototype.animateBar = function animateBar(index) {
        if (this._barHeights[index].isActive()) this._barHeights[index].halt();
        this._barHeights[index].set(1, this.options.barTransition);
    };

    Bargraph.prototype.render = function render() {
        var result = [];

        // render hiding pane
        if (this.addHidingPane) {
            result.push({
                origin: [0, 0],
                target: new Surface({
                    size: [undefined, undefined],
                    properties: {
                        zIndex: 3,
                        backgroundColor: this._background.getProperties().backgroundColor
                    }
                }).render()
            });
        }
        // render background
        result.push({
            origin: (this.options.direction === Bargraph.STYLE_COL) ? [0, 1] : [0, 0],
            target: this._background.render()
        });

        // render each bar 
        var offset = this.options.axisWidth + this.options.axisPadding;
        var transform;
        var LABEL_OFFSET = 20;
        var y_label = LABEL_OFFSET;
        for (var i=0; i<this._bars.length; i++) {
            this._bars[i].offset = offset;
            if (this.options.direction === Bargraph.STYLE_COL) {
                transform = Transform.thenScale(Transform.translate(offset, -(this.options.axisWidth + this.options.axisPadding)), [1, this._barHeights[i].get(), 1]);
            }
            else {
                transform = Transform.thenScale(Transform.translate(0, offset), [this._barHeights[i].get(), 1, 1]);
            }
            result.push({
                origin: (this.options.direction === Bargraph.STYLE_COL) ? [0, 1] : [0, 0],
                transform: transform,
                target: this._bars[i].render()
            });

            if (this._bars[i].properties.clicked) {
                result[result.length - 1].origin = [(offset+this._barWidth)/this.options.size[0], 1];
                result[result.length - 1].transform = Transform.scale(this._scaleBar[0].get(), this._scaleBar[1].get(), 1);
                // result[result.length - 1].transform = Transform.scale(1, 1, 100);
            }

            // add label
            (y_label === LABEL_OFFSET) ? y_label = 5 : y_label = LABEL_OFFSET;
            result.push({
                origin: [0, 1],
                transform: Transform.translate(offset, y_label, 1),
                target: new Surface({
                    content: this.options.data[i].label,
                    size: [0, 0],
                    properties: {
                        backgroundColor: 'hotpink',
                        color: this.options.barColor,
                        fontSize: '12px',
                        fontFamily: 'Myriad Pro',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        zIndex: 100
                    }
                }).render()
            });

            offset = offset + this._barWidth + this.options.gutterWidth;
        }

        return result;
    };

    module.exports = Bargraph;
});