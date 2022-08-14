const model = {
    state: {
        gridSize: 16
    }
};

const gridView = {
   x: 0,
   y: 0,
   data: undefined,
   isDrawing: false,
   sizeButton: document.querySelector('.btn-size'),
   clearButton: document.querySelector('.btn-clear'),
   gContainer: document.querySelector('.grid-container'),

   render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.gContainer.insertAdjacentHTML('beforeend', markup);
   },

   clear() {
    this.gContainer.textContent = '';
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
            gridView.x = eventObj.offsetX;
            gridView.y = eventObj.offsetY;
            gridView.isDrawing = true;
            break;
        
        case 'mousemove':
            if(gridView.isDrawing) {
                eventObj.target.classList.add('paint');
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

    init() {
        gridView.handleContentLoaded(this.controlGrid);
        gridView.handleMouse(this.controlHovering);
        gridView.handleClear(this.controlClearButton);
        gridView.handleSize(this.controlSizeButton);
    }
};

controller.init();