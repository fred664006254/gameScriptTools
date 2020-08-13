class AcGroupWifeBattleProtectView extends PopupView
{
	private _timesTxt : BaseTextField = null;
	private _itemNumTxt : BaseTextField = null;
	private _list:ScrollList=null;
    public constructor(){
		super();
    }
    
    protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}

    protected getTitleStr() : string{
        return `acGroupWifeBattleProtectTitle-${this.getUiCode()}`;
    }
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
        let allianceId = Api.playerVoApi.getPlayerAllianceId();
		return {requestType:NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,requestData:{
			activeId : view.vo.aidAndCode,
			allianceId : allianceId
		}};
    }
	
	private _data : any[] = [];
	private _isfresh = false;
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view._data = [];
        if(data.data.data && data.data.data.allianceList){
			view._data = data.data.data.allianceList;
        }
        if(this._isfresh)
        {
            this._isfresh = false;
            this.freshview();
        }
	}
    public initView():void{
        let view = this;

		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_PROTECT), view.protectCallback, view)

        let code = view.getUiCode();

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 750;
		bg.setPosition(GameConfig.stageWidth/2-bg.width/2-10,60);
		view.addChildToContainer(bg);

        let left = this.cfg.portect.maxTime1 - this.vo.proNum;
        let have = Api.itemVoApi.getItemNumInfoVoById(this.cfg.needItem.protect);
        let param = {mytimes:left,itemnum:have,aid:this.vo.aid,code:this.vo.code};        

        let canMaxTimes = this.cfg.portect.maxTime1;
        let timeskey = left > 0 ? `acGroupWifeBattleProtectTimes-${code}` : `acGroupWifeBattleProtectNoTimes-${code}`;
		let timestxt = ComponentManager.getTextField(LanguageManager.getlocal(timeskey, [""+view.vo.proNum,""+canMaxTimes]), 22, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, timestxt, bg, [10,-timestxt.height-10]);
		view.addChildToContainer(timestxt);
		view._timesTxt = timestxt;        

		let itemNumtxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleProtectItemNum-${code}`, [""+have]), 22, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, itemNumtxt, bg, [10,-itemNumtxt.height-10]);
		view.addChildToContainer(itemNumtxt);
		view._itemNumTxt = itemNumtxt;

        let arr = [];
        for(let i = 0; i < this._data.length; i++)
        {
            if(this._data[i].alive && this._data[i].uid != Api.playerVoApi.getPlayerID())
            {
                let obj = {};
                obj["name"] = this._data[i].name;
                obj["uid"] = this._data[i].uid;
                obj["pUid"] = this._data[i].pUid;
                obj["rank"] = this._data[i].myrank;
                obj["score"] = this._data[i].value;
                obj["ispro"] = this._data[i].pUid && this._data[i].pUid>0;
                let pNum = this._data[i].pNum ? parseInt(this._data[i].pNum+"") : 0;
                obj["times"] = this.cfg.portect.maxTime2 - pNum;
                obj["pid"] = this._data[i].pUid;
                obj["pic"] = this._data[i].pic;
                obj["ptitle"] = this._data[i].ptitle;

                obj["sort"] = 1;
                if(obj["ispro"])
                {
                    obj["sort"] = 2;
                }
                if(obj["times"] <= 0)
                {
                    obj["sort"] = 3;
                }

                arr.push(obj);
            }
        }
        arr.sort((a:any,b:any)=>
        {
            if(a.sort != b.sort)
            {
                return a.sort - b.sort;
            }
            return a.rank - b.rank;
        });

        // arr[0] = {name:"123",rank:1,score:20,ispro:false,times:3};
        // arr[1] = {name:"234",rank:3,score:20,ispro:true,times:2,pid:"111222333"};
        // arr[2] = {name:"345",rank:4,score:20,ispro:false,times:0};
        // arr[3] = {name:"678",rank:5,score:20,ispro:false,times:3};
        // arr[4] = {name:"345",rank:6,score:30,ispro:false,times:3};
        // arr[5] = {name:"456",rank:2,score:20,ispro:false,times:3};
        // arr[6] = {name:"789",rank:3,score:20,ispro:false,times:2};
        // arr[7] = {name:"890",rank:2,score:20,ispro:false,times:5};

		let rect = new egret.Rectangle(0, 0, 520, bg.height-10);
		let list = ComponentManager.getScrollList(AcGroupWifeBattleProtectItem, arr, rect, param);
        list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		list.setPosition(bg.x+bg.width/2-rect.width/2,bg.y+5);
		view.addChildToContainer(list);
		view._list = list;
    }

	private freshview():void
    {
		let view = this;
        let code = view.getUiCode();
        let arr = [];
        for(let i = 0; i < this._data.length; i++)
        {
            if(this._data[i].alive && this._data[i].uid != Api.playerVoApi.getPlayerID())
            {
                let obj = {};
                obj["name"] = this._data[i].name;
                obj["uid"] = this._data[i].uid;
                obj["pUid"] = this._data[i].pUid;
                obj["rank"] = this._data[i].myrank;
                obj["score"] = this._data[i].value;
                obj["ispro"] = this._data[i].pUid && this._data[i].pUid>0;
                obj["times"] = this._data[i].pNum ? (this.cfg.portect.maxTime2-this._data[i].pNum) : this.cfg.portect.maxTime2;
                obj["pid"] = this._data[i].pUid;
                obj["pic"] = this._data[i].pic;
                obj["ptitle"] = this._data[i].ptitle;

                obj["sort"] = 1;
                if(obj["ispro"])
                {
                    obj["sort"] = 2;
                }
                if(obj["times"] <= 0)
                {
                    obj["sort"] = 3;
                }

                arr.push(obj);
            }
        }
        arr.sort((a:any,b:any)=>
        {
            if(a.sort != b.sort)
            {
                return a.sort - b.sort;
            }
            return a.rank - b.rank;
        });

        let left = this.cfg.portect.maxTime1 - this.vo.proNum;
        let have = Api.itemVoApi.getItemNumInfoVoById(this.cfg.needItem.protect);
        let param = {mytimes:left,itemnum:have,aid:this.vo.aid,code:this.vo.code};

        this._list.refreshData(arr,param);

        let canMaxTimes = this.cfg.portect.maxTime1;
        let timeskey = left > 0 ? `acGroupWifeBattleProtectTimes-${code}` : `acGroupWifeBattleProtectNoTimes-${code}`;
		view._timesTxt.text = LanguageManager.getlocal(timeskey, [""+view.vo.proNum,""+canMaxTimes]);

		view._itemNumTxt.text = LanguageManager.getlocal(`acGroupWifeBattleProtectItemNum-${code}`, [""+have]);
	}

    private protectCallback(evt : egret.Event):void
    {
        let view = this;
        if(evt.data.ret && evt.data.data.data)
        {
            let data = evt.data.data.data;
            if(data.bgstats == 4)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleProtectTips2-"+this.getUiCode()));
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acGroupWifeBattleProtectTips1-"+this.getUiCode()));
            }
			if(data.groupwifebattle){
				this.vo.setWifebattleInfo(data.groupwifebattle);
			}            
            this._isfresh = true;
            let allianceId = Api.playerVoApi.getPlayerAllianceId();
            this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,{activeId : view.vo.aidAndCode,allianceId : allianceId});
        }
    }
	protected getShowHeight():number
	{
		return 900;
    }   
    public dispose():void{
		let view = this;
		view._timesTxt = null;
		view._itemNumTxt = null;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_PROTECT), view.protectCallback, view)        
        super.dispose();
    }
}