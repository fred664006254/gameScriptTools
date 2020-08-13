/**
 * 合成vo
 * author 陈可
 * date 2019/12/02
 * @class ComposemapVo
 */
class ComposemapVo extends BaseVo 
{
    private info:{[key:string]:{lv:number}};
    public maxinfo:{plv:number,mid:number};
    public attinfo:{st:number,num:number};
    public mapInfoList:{[key:string]:ComposemapItemVo}={};
    public mapInfoLvList:{[lv:string]:string[]}={};

    public delList:string[]=[];
    public addList:string[]=[];
    public needRefreshList:{[key:string]:ComposemapItemVo}={};
    public minX:number=0;
    public maxX:number=0;
    public minY:number=0;
    public maxY:number=0;
    public minLvData:{lv:number,num:number,item:ComposemapItemVo};
    private isInit:boolean=false;
    public constructor()
    {
		super();
	}

	public initData(data:any):void
	{
        this.mapInfoLvList={};
        this.addList.length=0;
        for(let key in data)
        {
            if(data.hasOwnProperty(key))
            {
                this[key]=data[key];
            }
        }
        if(data.attinfo)
        {
            this.attinfo={st:data.attinfo.st,num:data.attinfo.num};
        }
        if(this.info)
        {
            let curKeys=Object.keys(this.mapInfoList);
            this.minLvData=null;
            for(let key in this.info)
            {
                if(this.info.hasOwnProperty(key))
                {
                    let item:ComposemapItemVo=null;
                    let lv=0;
                    let nlv=lv;
                    if(this.mapInfoList[key])
                    {
                        item=this.mapInfoList[key];
                        lv=item.lv;
                    }
                    else
                    {
                        item=new ComposemapItemVo();
                        this.mapInfoList[key]=item;
                    }
                    item.initData(this.info[key],key);
                    this.minX=Math.min(this.minX,item.x);
                    this.maxX=Math.max(this.maxX,item.x);
                    this.minY=Math.min(this.minY,item.y);
                    this.maxY=Math.max(this.maxY,item.y);
                    nlv=item.lv;
                    let cidx=curKeys.indexOf(key);
                    if(cidx>=0)
                    {
                        if(nlv||!lv)
                        {
                            curKeys.splice(cidx,1);
                        }
                    }
                    if(lv==0&&nlv>0)
                    {
                        this.addList.push(key);
                    }
                    this.formatListData(item);
                }
            }
            if(this.minLvData&&this.minLvData.num==1)
            {
                
            }
            this.delList=curKeys;
        }
    }

    private formatListData(item:ComposemapItemVo):boolean
    {
        if(item.lv)
        {
            if(!this.mapInfoLvList[item.lv])
            {
                this.mapInfoLvList[item.lv]=[item.id];
            }
            else
            {
                this.mapInfoLvList[item.lv].push(item.id);
            }
            if(!this.minLvData)
            {
                this.minLvData={lv:item.lv,num:0,item:item};
            }
            if(item.lv<this.minLvData.lv)
            {
                this.minLvData.lv=item.lv;
                this.minLvData.num=1;
                this.minLvData.item=item;
            }
            else if(item.lv==this.minLvData.lv)
            {
                this.minLvData.num++;
            }
            return true;
        }
        return false;
    }

    public delClientitem():void
    {
        if(this.delList&&this.delList.length>0)
        {
            let l=this.delList.length;
            for(let i=0;i<this.delList.length;i++)
            {
                let id=this.delList[i];
                this.mapInfoList[id].clear();
            }
        }
    }

    public addClientItem(id:string,lv:number):boolean
    {
        let result:boolean=false;
        let item = this.mapInfoList[id];
        if(item&&item.lv==0&&lv>0)
        {
            item.initData({lv:lv},id);
            item.client=true;
            this.addList.push(item.id);
            result=this.formatListData(item);
            this.delList.push(item.id);
            result=true;
        }
        return result;
    }

    public move(oid:string,nid:string):void 
    {
        let oitem=this.mapInfoList[oid];
        let nitem=this.mapInfoList[nid];
        // this.mapInfoLvList[oitem.lv]
        let olv=oitem.lv;
        let nlv=nitem.lv;
        oitem.move(nid);
        this.mapInfoList[nid]=oitem;
        nitem.move(oid);
        this.mapInfoList[oid]=nitem;
        
        if(olv!=nlv)
        {
            let oidx = this.mapInfoLvList[olv].indexOf(oid);
            this.mapInfoLvList[olv][oidx]=nid;
            if(this.mapInfoLvList[nlv])
            {
                let nidx=this.mapInfoLvList[nlv].indexOf(nid);
                this.mapInfoLvList[nlv][nidx]=oid;
            }
        }
    }

    public removeData(id:string):void 
    {
        let item=this.mapInfoList[id];
        if(item)
        {
            item.clear();
        }
    }

    public dispose():void
    {
        this.info=null;
        this.maxinfo=null;
        this.attinfo=null;
        this.mapInfoLvList={};
        this.maxX=this.maxY=this.minX=this.minY=0;
        this.minLvData=null;
        this.addList.length=0;
        this.delList.length=0;
        App.CommonUtil.clearData(this.mapInfoList);
    }
}

class ComposemapItemVo extends BaseVo
{
    public id:string;
    public x:number;
    public y:number;
    public lv:number=0;
    public client:boolean=false;
    // public unlocking:boolean=false;
    public constructor() 
    {
		super();
    }
    public initData(data:any,id?:string):void
	{
        this.clear();
        for(let key in data)
        {
            if(data.hasOwnProperty(key))
            {
                this[key] = data[key];
            }
        }
        this.move(id);
    }

    public move(id:string):void 
    {
        this.id=String(id);
        let{x,y}=Config.MapinfoCfg.getPosById(id);
        this.x=x;
        this.y=y;
    }
    public clear():void 
    {
        this.lv=0;
        this.client=false;
        this.x=this.y=NaN;
        this.id=null;
        // this.unlocking=false;
    }
    public dispose():void
    {
    }
}