/**
 * 皇陵海层面item
 * author qianjun
 * date 2017/12/07
 */
class AcLocTombSeaFloorItem  extends ScrollListItem
{
    private _list : ScrollList;
    private _icon : BaseLoadBitmap = null;
    private _midDescBg : BaseBitmap = null;
    private _bloodTxt : BaseTextField = null;
    private _bossnumTxt : BaseTextField = null;
    private _boxnumTxt : BaseTextField = null;
    private _killerTxt : BaseTextField = null;
    private _data : any = null;;
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
        return AcConst.AID_LOCTOMB;
	}
	
	private get code() : string{
        return this._code;
    }

    private _code;
    protected initItem(index:number,data:any,itemparam)
    {
        let view = this;
        view._data = data;
        view._code = itemparam;
        view.width = GameConfig.stageWidth;
        let finalBoss = data.id == 0 
		view.height = finalBoss ? 337 : 172;
        
        let bgstr = finalBoss ? `tombbossitem` : `tombbg4`;
        let bg:BaseBitmap = BaseBitmap.create(`${bgstr}-${view.code}`);  
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bg, view, [0,0], true);
        view.addChild(bg);
        if(finalBoss){
            let middletop = BaseBitmap.create(`tombbg2-${view.code}`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, middletop, view, [0,0], true);
            view.addChild(middletop);
            //1未开启 2已发现
            let status = view.vo.getFinalbossStatusById();
            let cfg = view.cfg.getBossNpcItemCfgById(7);
            let iconStr = '';
            if(status == 2){
                iconStr = cfg.getnpcIcon(view.code);
            }
            else{
                iconStr = `teamiconstatus${1}-${view._code}`
            }
            let icon = BaseLoadBitmap.create(iconStr);
            icon.width = 77;
            icon.height = 77;
            icon.addTouchTap(()=>{
                if(view.vo.moviePlay){
                    return;
                }
                let status = view.vo.getFinalbossStatusById();
                if(status == 1){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`loctombfloorbosstip3-${view.code}`, [view.cfg.needKillNum.toString(), view.vo.getCurKillNum().toString()]));
                }
                else if(status == 2){
                    ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBBATTLEVIEW,{
                        aid : view.aid,
                        code : view.code,
                        foeId : cfg.id,
                        bosskey : 1,
                        rewards : view.vo.getTombKillerRewards(cfg.id, 1),
                        id : 0,
                    });
                }
                
                // let status = view.vo.getBoxStatusById(data.idx);
            }, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, bg, [0,30]);
            view.addChild(icon);
            view._icon = icon;

            let descbg = BaseBitmap.create('public_9_downbg');
            view.addChild(descbg);
            descbg.width = 328;
            view._midDescBg = descbg; 

            let numTxt = ComponentManager.getTextField(``,20);
            view.addChild(numTxt);
            view._bossnumTxt = numTxt; 

            let boxnumTxt = ComponentManager.getTextField(``,20);
            view.addChild(boxnumTxt);
            view._boxnumTxt = boxnumTxt;

            let blodTxt = ComponentManager.getTextField(``,20);
            view.addChild(blodTxt);
            view._bloodTxt = blodTxt; 

            let killerTxt = ComponentManager.getTextField(``,20);
            view.addChild(killerTxt);
            view._killerTxt = killerTxt; 
            view.freshBloodTxt();
        }
        else{
            let floorNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombfloornum-${view.code}`, [data.id]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, floorNumTxt, bg, [0,9]);
            view.addChild(floorNumTxt);

            let arr = view.vo.getBoxDataByFloor(data.id);
            //物品列表
			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, 614, 80);
			let scrollList = ComponentManager.getScrollList(AcLocTombSeaBoxItem, arr, rect, view.code);
			//scrollList.setContentPosY(middletop.height);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, bg, [0,67]);
            view.addChild(scrollList);
            scrollList.horizontalScrollPolicy = 'off';
			scrollList.bounces = false;
			view._list = scrollList;
        }
        
        //status 1 未开启 2 怪物或宝箱 3 已开启
    }

    public freshData():void{
        let view = this;
        for(let i = 0; i < 6; ++ i){
            let item : any = view._list.getItemByIndex(i);
            item.update();
        }
    }

    public freshBossInfo():void{
        let view = this;
        //1未开启 2已发现
        let status = view.vo.getFinalbossStatusById();
        let cfg = view.cfg.getBossNpcItemCfgById(7);
        let iconStr = '';
        if(status == 2){
            iconStr = cfg.getnpcIcon(view.code);
        }
        else{
            iconStr = `teamiconstatus${1}-${view._code}`
        }
        view._icon.setload(iconStr);
        //总boss血量
        view.freshBloodTxt();
    }

    public freshAfterDig(index : number):void{
        let view = this;
        let item : any = view._list.getItemByIndex(index);
        if(item){
            item.freshAfterDig();
        }
    }

    public freshAfterAttack(index : number):void{
        let view = this;
        let item : any = view._list.getItemByIndex(index);
        if(item){
            item.update();
        }
    }

    public freshBloodTxt():void{
        let view = this;
        let cfg = view.cfg.getBossNpcItemCfgById(7);
        let status = view.vo.getFinalbossStatusById();
        let bossnum = view.vo.getLastBossNum();
        let boxnum = view.vo.getLastBoxNum();

        view._bossnumTxt.text = LanguageManager.getlocal(`loctombfloorbosstip6-${view.code}`, [bossnum.toString()]);
        view._boxnumTxt.text = LanguageManager.getlocal(`loctombfloorbosstip5-${view.code}`, [boxnum.toString()]);

        let num = view.vo.getTombBlood(7,1);
        let maxHp = view.vo.getTombMaxHp(7);
        if(isNaN(num)){
            num = maxHp;
        }
        if(status == 2){
            let value = Math.max(num / maxHp * 100, 0.001);
            if(num <= 0){
                value = 0;
                view._killerTxt.text = LanguageManager.getlocal(`loctombfloorbosstip2-${view.code}`, [view.vo.getTombKiller(cfg.id,1)]);
                App.DisplayUtil.changeToGray(view._icon);
            }
            let str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0,-1)).toString();
            view._bloodTxt.text = LanguageManager.getlocal(`loctombfloorbosstip${value == 0 ? 4 : 1}-${view.code}`, [cfg.getnpcName(view.code), String(num > 0 ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3), str]);
        }
        view._midDescBg.height = view._bossnumTxt.textHeight + view._boxnumTxt.textHeight + view._killerTxt.textHeight + view._bloodTxt.textHeight + 10 + (status == 1 ? 0 : (num > 0 ? 10 : 20)) + 40;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._midDescBg, view, [0,20], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._midDescBg, view, [0,20], true);
        if(status == 1){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._midDescBg, [0,20]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bloodTxt, view._midDescBg, [0,20]);
            if(num <= 0){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._killerTxt, view._bloodTxt, [0, view._bloodTxt.textHeight + 10]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._killerTxt, [0, view._killerTxt.textHeight + 10]);
            }
            else{
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._bossnumTxt, view._bloodTxt, [0, view._bloodTxt.textHeight + 10]);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._boxnumTxt, view._bossnumTxt, [0,view._bossnumTxt.textHeight + 10]);
    }

    public dispose():void
    {
        this._list = null;
        this._icon = null;
        if(this._killerTxt){
            this._killerTxt = null;
        }
        if(this._midDescBg){
            this._midDescBg = null;
        }
        if(this._bloodTxt){
            this._bloodTxt = null;
        }
        this._data = null;
        super.dispose();
    }
}