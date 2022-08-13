"use strict"

const model = {
    limit: 100,
    gridSize: 16,
};


const gridView = {
    init(size) {
        this.size = size;
        this.gContainer = document.querySelector('.grid-container');
        this.gContainer.setAttribute("style",`grid-template-rows:repeat(${this.size}, 1fr)`);
        this.gContainer.setAttribute("style", `grid-template-columns:repeat(${this.size}, 1fr)`);
        
        this.render();
    },

    render() {
        const markup = this.generateMarkup();
        this.gContainer.insertAdjacentHTML('beforeend', markup);
    },
    

    generateMarkup() {
        let _str = '';
        for(let i = 1; i <= (this.size * this.size); i++) {
            _str += `<div class="grid-item"></div>`;
        }
        return _str;
    },

    draw() {
        let x = 0;
        let y = 0;
        let isDrawing = false;

        this.gContainer.addEventListener('mousedown', function(e) {
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
       });

       this.gContainer.addEventListener('mousemove', function(e) {
            if(isDrawing) {
                e.target.classList = 'paint';
                x = e.offsetX;
                y = e.offsetY;
            }
       });

       this.gContainer.addEventListener('mouseup', function(e) {
            x = 0;
            y = 0;
            isDrawing = false;
       });
    },
    
    handleContentLoaded(handle) {
        document.addEventListener('DOMContentLoaded', handle)
    },

};


const controller = {
    init() {
        gridView.handleContentLoaded(this.controlGrid);
    },

    controlGrid() {
        gridView.init(model.gridSize);
        gridView.draw();
    },
};

controller.init();