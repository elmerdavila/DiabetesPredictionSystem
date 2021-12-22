export class Email{
    destinatario:string;
    asunto:string;
    mensaje:string;
    
    constructor(destinatario:string,asunto: string, mensaje: string){
        this.destinatario=destinatario;
        this.asunto=asunto;
        this.mensaje=mensaje;
    }
    
}