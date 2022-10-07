export class Stack {
    constructor(moneda,modal){
        this.stack = [];
        this.moneda = moneda;
        this.modal=modal;
    }
 

    push(element){
        this.stack.push(element);
        return this.stack;
    }
    pop(){
        return this.stack.pop();
    }
    peek(){
        return this.stack[this.stack.length-1];
    }
    
    previous(){
        return this.stack[this.stack.length-2];
    }

    size(){
        return this.stack.length;
    }

    pos(){
        return this.stack.length-1;
    }
    print(){
        console.log(this.stack);
    }
    setMoneda(moneda){
        this.moneda;
    }
    setModal(modal){
        this.modal=modal;
    }
}