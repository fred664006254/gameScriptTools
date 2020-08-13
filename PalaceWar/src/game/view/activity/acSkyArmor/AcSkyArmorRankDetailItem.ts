/**
 * 天魔铠甲排行item
 * author wxz
 * date 2020.6.29
 */

class AcSkyArmorRankDetailItem extends ScrollListItem
{
    private _data:any = null;
    private _itemParam:any = null;
    public constructor()
    {
        super();
     
    }

    public initItem(index:number, data:any, itemParam:any)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback,this);
        this._data = data;
        this._itemParam = itemParam;
        
        this.width = 520;
        let tarColor = TextFieldConst.COLOR_BROWN;
        if(data.uid){
            if( data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }

        let offHeight = 0;
        if (index > 2)
        {
            let rankbg = BaseBitmap.create("rankbgs_4");
            rankbg.width = 500;
            rankbg.height = 62;
            rankbg.x = this.width/2 - rankbg.width/2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;
            rankbg.visible = false;
            
            let rank = ComponentManager.getTextField(String(index+1), TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
            rank.x = 68 - rank.width/2;
            rank.y = offHeight/2 - rank.height/2;
            this.addChild(rank);
        }else
        {
            let rankbg = BaseBitmap.create("rankbgs_"+String(index+1));
            rankbg.width = 500;
            rankbg.height = 76;
            rankbg.x = this.width/2 - rankbg.width/2;
            rankbg.y = 0;
            this.addChild(rankbg);
            offHeight = rankbg.height;

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1)); 
            rankImg.x = 30;
            rankImg.y = 17;
            this.addChild(rankImg);
        }
    
        let name = ComponentManager.getTextField(data.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        name.x = 240 - name.width/2;
        name.y = offHeight/2 - name.height/2;
        this.addChild(name);

        let score = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor);
        if(data.value > 0){
            score.text = App.StringUtil.changeIntToText(data.value, 1);

        }else{
            score.text = "0";
        }
        score.x = 440 - score.width/2;
        score.y = offHeight/2 - score.height/2;
        this.addChild(score);

        let lineImg = BaseBitmap.create("rank_line");
        lineImg.width = 510;
        lineImg.height = 2;
        lineImg.x = this.width/2 - lineImg.width/2;
        lineImg.y = offHeight - 1;
        this.addChild(lineImg);
    }

    private userShotCallback(event:egret.Event)
    {
        if (!event.data.ret){
            return;
        }
        let data = event.data.data.data;
        if(String(data.ruid) == this._data.uid)
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid();
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }

    private get cfg():Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get aid():string{
        return this._itemParam.aid;
    }

    private get code():string{
        return this._itemParam.code;
	}

    public getSpaceX():number
	{
		return 0;
	}
	
	public getSpaceY():number
	{
		return 0;
    }
    
    public dispose():void
    {   
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._data = null;
        this._itemParam = null;
        super.dispose();
    }
}