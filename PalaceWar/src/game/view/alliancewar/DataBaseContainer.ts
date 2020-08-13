namespace DataBaseContainer{
    export class SingleLinkList{
        private head : Node = null;
        public constructor(){
            this.head = new Node('head');
        }

        //尾节点插入数据
        public insertToTail(data : any):void{
            let newNode = new Node(data);
            let tmp = this.head;
            while(tmp.next != null){
                tmp = tmp.next;
            }
            tmp.next = newNode;
        }

        //头结点插入数据
        public insertToHead(data : any):void{
            let newNode = new Node(data);
            let tmp = this.head;
            while(tmp.next != null){
                tmp = tmp.next;
            }
            tmp.next = newNode;
        }
        
        //删除数据
        public delete(data : any):void{
            let tmp = this.head;
            while(tmp.data !== data){
                tmp = tmp.next;
            }
        }
    }

    class Node {
        public data : any;
        public next : Node;

        public constructor(data : any){
            this.data = data;
            this.next = null;
        }
    }
}