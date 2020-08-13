namespace Config
{
    export namespace MapinfoCfg
    {
        let map:{[key: string]:{coordinate:string,state:number,group:string,openConditon:string,challengeID:number,building:number}};
        let mapGroup:{[group:string]:{unlock?:number,coordinateSet:string[]}};
        export let mapList:{[key:string]:MapinfoItemCfg}={};
        let groupListCfg:{[key:string]:MapinfoItemCfg[]}={};
        export let groupIdArr:string[]=[];
        export let idArr:string[]=[];
        export let buildIdArr:string[]=[];
        export let maxXY:{x:number,y:number}={x:0,y:0};
        export let maxUnLock: number = 0;
        export function formatData(data:any):void
        {
            groupIdArr.length=0;
            idArr.length=0;
            buildIdArr.length=0;
            groupListCfg = {};
            mapList = {};
            map = {};
            mapGroup = {};
            if(data)
            {
                map=data.map;
                mapGroup=data.mapGroup;
                for (let gid in mapGroup) {
                    if (mapGroup[gid].unlock && mapGroup[gid].unlock > maxUnLock) {
                        maxUnLock = mapGroup[gid].unlock;
                    }
                }
            }
            if(map)
            {
                idArr=Object.keys(map);
                for(var key in map)
                {
                    if(map.hasOwnProperty(key))
                    {
                        let cfg=map[key];
                        let itemCfg=new MapinfoItemCfg();
                        itemCfg.initData(cfg);
                        maxXY.x=Math.max(itemCfg.x,maxXY.x);
                        maxXY.y=Math.max(itemCfg.y,maxXY.y);
                        itemCfg.id=String(key);
                        mapList[itemCfg.id]=itemCfg;
                        if(!groupListCfg[itemCfg.group])
                        {
                            groupListCfg[itemCfg.group]=[];
                        }
                        groupListCfg[itemCfg.group].push(itemCfg);
                        let goupNum=itemCfg.group;
                        if(groupIdArr.indexOf(goupNum)<0)
                        {
                            groupIdArr.push(goupNum);
                        }
                        if(itemCfg.building&&buildIdArr.indexOf(itemCfg.group)<0)
                        {
                            buildIdArr.push(itemCfg.group);
                        }
                    }
                }
                //组排序，左下，右下，左上，右上
                for(let group in groupListCfg)
                {
                    if(groupListCfg.hasOwnProperty(group))
                    {
                        groupListCfg[group].sort((a,b)=>{
                            return a.x-b.x;
                        });
                    }
                }
                groupIdArr.sort((a,b)=>{
                    return Number(a)-Number(b);
                });
            }
        }

        export function getAllMapGroup(): {[group:string]:{unlock?:number,coordinateSet:string[]}} {
            return mapGroup;
        }

        /**
         * 根据组获取解锁关卡ID
         * @param group 组
         */
        export function getUnlockByGroup(group:string):number
        {
            return mapGroup[group].unlock||0;
        }

        /**
         * 根据组获取数据
         * @param group 组
         */
        export function getGroupData(group:string):any
        {
            return mapGroup[group];
        }

        export function getCfgByGroup(group:string):MapinfoItemCfg[]
        {
            return groupListCfg[group];
        }

        export function getStartPosCfgByGroup(group:string):MapinfoItemCfg
        {
            return getCfgByGroup(group)[0];
        }

        export function getCfgByPos(x:number,y:number):MapinfoItemCfg
        {
            let id=getIdByPos(x,y);
            return mapList[id]||null;
        }

        export function getNextUnlockGroup(cid:number):string
        {
            let group:string='';
            let unlock:number=-1;
            let l = groupIdArr.length;
            let unlockNum=0;
            for(let i=0;i<l;i++)
            {
                let tmpgroup=groupIdArr[i];
                let tmpunlock = mapGroup[tmpgroup].unlock||0;
                if(tmpunlock>cid)
                {
                    if(unlock==-1||tmpunlock<unlock)
                    {
                        unlock=tmpunlock;
                        group=String(tmpgroup);
                    }
                }
            }
            return String(group);
        }

        export function getUnlockGroupList(cid:number):string[]
        {
            let groupArr:string[]=[];
            let l = groupIdArr.length;
            for(let i=0;i<l;i++)
            {
                let tmpgroup=groupIdArr[i];
                let tmpunlock = mapGroup[tmpgroup].unlock||0;
                if(tmpunlock<=cid)
                {
                    groupArr.push(String(tmpgroup));
                }
            }
            return groupArr;
        }

        export function getPersonMoveRes(lv:number):string
        {
            let res="composeeffect"+lv;
            while(!ResourceManager.hasRes(res))
            {
                lv--;
                res="composeeffect"+lv;
                if(lv<2)
                {
                    break;
                }
            }
            return res;
        }

        export function getPersonRes(lv:number):string
        {
            let res="composelv"+lv;
            while(!ResourceManager.hasRes(res))
            {
                lv--;
                res="composelv"+lv;
                if(lv<2)
                {
                    break;
                }
            }
            return res;
        }
        export function getPersonResBig(lv:number):string
        {
            let res="composebiglv"+lv;
            while(!ResourceManager.hasRes(res))
            {
                lv--;
                res="composebiglv"+lv;
                if(lv<2)
                {
                    break;
                }
            }
            return res;
        }
        

        export function checkHasPos(x:number,y:number):boolean
        {
            let result:boolean=false;
            let cfg=getCfgByPos(x,y);
            if(cfg)
            {
                result=true;
            }
            return result;
        }

        /**
         * 根据地块ID取坐标
         * @param id 
         */
        export function getPosById(id:string):{x:number,y:number}
        {
            let x=Number(id.substr(1,2));
            let y=Number(id.substr(3,2));
            return {x:x,y:y};
        }
        /**
         * 根据坐标取ID
         * @param x 
         * @param y 
         */
        export function getIdByPos(x:number,y:number):string
        {
            let xStr:String=String(x);
            let yStr:string=String(y);
            if(xStr.length<2)
            {
                xStr="0"+xStr;
            }
            if(yStr.length<2)
            {
                yStr="0"+yStr;
            }
            return "1"+xStr+yStr;
        }

    }
    class MapinfoItemCfg extends BaseItemCfg
    {
        private coordinate:string;
        public state:number;
        public group:string;
        public openConditon:number;
        public challengeID:number;
        
        /**
         *building:)建筑（1 兵营 雇佣家丁;2 府衙  经营;3 城镇 进城
         */
        public building:number=0;

        public x:number;
        public y:number;
        public id:string;
        public constructor() 
        {
            super()
        }

        public initData(data:any):void
        {
            if(data)
            {
                for(var key in data)
                {
                    this[key]=data[key];
                }
                let posArr = this.coordinate.split(",");
                this.x=Number(posArr[0]);
                this.y=Number(posArr[1]);
            }
        }

        public get defaultOpen():boolean
        {
            return this.state==0;
        }

        public get buildRes():string
        {
            if(this.building)
            {
                return "composebuild"+this.building;
            }
            else
            {
                return this.randomRes;
            }
        }

        private get randomRes():string
        {
            return "composebuild"+this.building+"_1";//+((this.x%4+this.y%4)%4+1);
        }
    }
}