/**
 * 练武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkTableItem
 */

class StudyatkTableItem extends BaseDisplayObjectContainer
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _atkData:any = undefined;
    private _cdTxt:BaseTextField;
    private _cdEndSec:number;
    private _nameTxt:BaseTextField;
    private _npcList = [];
    private _master:BaseBitmap;
	public constructor() {
		super();
        this.init();
	}

	public init():void
	{
       
        let tableImg = BaseBitmap.create("studyatk_table");
        this.addChild(tableImg);

        let masterBg = BaseBitmap.create("studyatk_master_bg");
        masterBg.width = 205;
        masterBg.height = 60;
        masterBg.x = tableImg.x + tableImg.width/2 - masterBg.width/2-5;
        masterBg.y =  tableImg.y + tableImg.height/2 - masterBg.height/2 - 25;
        this.addChild(masterBg);
        


        this._cdTxt = ComponentManager.getTextField("",20);
        this._cdTxt.x = 50;
        this._cdTxt.y = masterBg.y + 7;
        this.addChild(this._cdTxt);

        let nameTxt =  ComponentManager.getTextField("",20);
        nameTxt.x = this._cdTxt.x;
        nameTxt.y = this._cdTxt.y + 25;
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;

        let master = BaseBitmap.create("studyatk_master");
        master.x = masterBg.x + 10;
        master.y =  masterBg.y + masterBg.height/2 - master.height/2;
        this._master = master;
        this.addChild(master);

        if(PlatformManager.checkIsEnLang()||PlatformManager.checkIsRuLang()){
            this._master.x = -10;
            this._master.y = 35;
            this._cdTxt.x = 20;
            this._nameTxt.x = this._cdTxt.x;
        }



        this.addTouchTap(this.enterAtkDetail,this);
        TickManager.addTick(this.tick,this);
    }
    protected refreshUI(atkdata:any)
    {
        this._atkData = atkdata; 
        let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg
        let lasttime = studyAtkBaseCfg.lastTime;
        if(this._atkData.lastTime){
            lasttime = this._atkData.lastTime;
        }
        this._cdEndSec = this._atkData.create_time + lasttime;
        
        let posList = [
                {x:15,y:-10},
                {x:190,y:-10},
                {x:15,y:105},
                {x:190,y:105},
            ]
     
        for (var key in this._npcList) {
            this._npcList[key].visible = false;
        }
        let len =  Object.keys(this._atkData.minfo).length +1;
        let indexNum = this._master.parent.getChildIndex(this._master);
        for (var index = 0; index < len; index++) {
            let npc = <BaseBitmap>this._npcList[index];
            if (!npc)
            {
                npc = BaseBitmap.create("studyatk_table_npc");
                npc.x = posList[index].x;
                npc.y = posList[index].y;
                // this.addChild(npc);
                this.addChildAt(npc,indexNum);
                this._npcList.push(npc);
                if(index%2 == 1)
                {
                    npc.scaleX = -1;
                }
            }
            npc.visible = true;
        }  
        this._nameTxt.text = this._atkData.name;
        let str1 = LanguageManager.getlocal("officialTitle"+this._atkData.level);
        let leftTimt =  this._cdEndSec - GameData.serverTime;
        this._cdTxt.text = LanguageManager.getlocal("studyatk_itemCdTxt",[str1,App.DateUtil.getFormatBySecond(leftTimt,3)]);

        TickManager.removeTick(this.tick,this);
        TickManager.addTick(this.tick,this);
    }
    protected enterAtkDetail()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW,this._atkData)
    }

    public tick():boolean
	{   
        let leftTimt =  this._cdEndSec - GameData.serverTime;
        if (leftTimt >= 0)
        {
            let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            let str1 = LanguageManager.getlocal("officialTitle"+this._atkData.level);
            this._cdTxt.text = LanguageManager.getlocal("studyatk_itemCdTxt",[str1,App.DateUtil.getFormatBySecond(leftTimt,3)]);
            if (leftTimt == 0)
            {
                // 是否需要同步？
                NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX,{});
            }
            return true;
        }
        return false;
	}

    public dispose()
    {
        TickManager.removeTick(this.tick,this);
        this._nodeContainer = null;
        this._atkData = null;
        this._cdTxt = null;
        this._cdEndSec = null;
        this._nameTxt = null;

        super.dispose();
    }

}