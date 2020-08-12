class AdvertiseVo extends BaseVo{
// need dispose var start
    private info:{[key:string]: {st:number, num:number}} = null;
    private lastday:number = null;
// need dispose end

    public get Info(){
        return this.info;
    }
    public get Lastday(){
        return this.lastday;
    }
    public constructor() {
        super();
        }
    public initData(data:any):void{
        if(data){
            for(let key in data){
                if(data.hasOwnProperty(key))
                    this[key]=data[key];
            }
        }
    }

    public dispose():void{
// dispose start
        this.info = null;
        this.lastday = null;
// dispose end
    }
}