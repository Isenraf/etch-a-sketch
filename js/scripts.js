const model = {
    state: {
        gridSize: 16
    }
};

const gridView = {
   x: 0,
   y: 0,
   data: undefined,
   color: "#212529",
   timerId: undefined,
   isDrawing: false,
   sizeButton: document.querySelector('.btn-size'),
   eraseButton: document.querySelector('.btn-erase'),
   paintButton: document.querySelector('.btn-paint'),
   clearButton: document.querySelector('.btn-clear'),
   rainbowButton: document.querySelector('.btn-rainbow'),
   gContainer: document.querySelector('.grid-container'),

   render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.gContainer.insertAdjacentHTML('beforeend', markup);
   },

   clear() {
    this.gContainer.textContent = '';
   },

   clearTimer() {
    clearInterval(this.timerId);
   },

   colorRGB() {
    const red = `${this.randomNum()}`;
    const green = `${this.randomNum()}`;
    const blue = `${this.randomNum()}`;
    return `${red}, ${green}, ${blue}`;
   },

   randomNum() {
    return  Math.floor(Math.random() * 256);
   },

   generateMarkup() {
    let _string = '';
    this.gContainer.setAttribute("style",`grid-template-rows:repeat(${this.data}, 1fr)`);
    this.gContainer.setAttribute("style", `grid-template-columns:repeat(${this.data}, 1fr)`);
       
    for(let i = 1; i <= (this.data * this.data); i++) {
        _string += `<div class="grid-item"></div>`;
    }

    return _string;
   },

    handleMouse(handle) {
        this.gContainer.addEventListener('mousedown', function(e) {
            handle(e);
        });

        this.gContainer.addEventListener('mousemove', function(e) {
            handle(e);
        });

        this.gContainer.addEventListener('mouseup', function(e) {
            handle(e);
        });
    },

    handleClear(handle) {
        this.clearButton.addEventListener('click', handle);
    },

    handleErase(handle) {
        this.eraseButton.addEventListener('click', handle);
    },

    handlePaint(handle) {
        this.paintButton.addEventListener('click', handle);
    },

    handleRainbow(handle) {
        this.rainbowButton.addEventListener('click', handle);
    },

    handleSize(handle) {
        this.sizeButton.addEventListener('click', function() {
            const newSize = parseInt(prompt('Enter new grid size'));
            handle(newSize);
        });
    },
   
    handleContentLoaded(handle) {
        document.addEventListener('DOMContentLoaded', handle)
    },
};

const controller = {
    controlGrid() {
        gridView.render(model.state.gridSize);
    },

    controlHovering(eventObj) {
       switch(eventObj.type) {
        case 'mousedown':
            eventObj.target.style.backgroundColor = gridView.color;
            gridView.x = eventObj.offsetX;
            gridView.y = eventObj.offsetY;
            gridView.isDrawing = true;
            break;
        
        case 'mousemove':
            if(gridView.isDrawing) {
                eventObj.target.style.backgroundColor = gridView.color;
                gridView.x = eventObj.offsetX;
                gridView.y = eventObj.offsetY;
            }
            break;
        
        case 'mouseup':
            gridView.x = 0;
            gridView.y = 0;
            gridView.isDrawing = false;
            break;
       }
    },

    controlClearButton() {
        gridView.clear();
        gridView.render(model.state.gridSize);
    },

    controlSizeButton(size) {
        if(!size) return;

        model.state.gridSize = size > 100? 100: size;
        gridView.clear();
        gridView.render(model.state.gridSize);
    },

    // contol ERASE AND PAINT are practically theysame
    // so don't forget to refactor them inside one function
    controlEraseButton() {
        gridView.clearTimer();
        gridView.color = "#E4F3D8";
        gridView.handleMouse(this.controlHovering);
    },

    controlPaintButton() {
        gridView.clearTimer();
        gridView.color = "#212529";
        gridView.handleMouse(this.controlHovering);
    },

    controlRainbow() {
       gridView.timerId = setInterval(() => {
        gridView.color = `rgb(${gridView.colorRGB()})`;
        gridView.handleMouse(this.controlHovering);
       }, 100);
    },

    init() {
        gridView.handleContentLoaded(this.controlGrid);
        gridView.handleMouse(this.controlHovering);
        gridView.handleClear(this.controlClearButton);
        gridView.handleSize(this.controlSizeButton);
        gridView.handleErase(this.controlEraseButton.bind(this));
        gridView.handlePaint(this.controlPaintButton.bind(this));
        gridView.handleRainbow(this.controlRainbow.bind(this));
    }
};

controller.init();