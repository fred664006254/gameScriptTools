/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcArrowRankListScrollItem
 */
class AcConquerMainLandDetailViewTab2Tab1ScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
	private _aidAndCode:{"aid":string,"code":string} = null;

    public constructor()
    {
        super();
    }
    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
    }

	private get cfg() : Config.AcCfg.ArrowCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
    }

    protected initItem(index:number,data:any,itemParam:any)
    {
        
        let key = data.key;
        let rItem = data;
        let id = rItem.id;
        let scroStartY = 10;
        this._aidAndCode = itemParam;
		
        
        let innerbg = BaseBitmap.create("public_9v_bg14");
        innerbg.width = 620;
        innerbg.height = 420;
        innerbg.x = 0;
        innerbg.y = scroStartY-10;
        this.addChild(innerbg);
        
        let innerKuang = BaseBitmap.create("public_9v_bg12"); 
        innerKuang.width = innerbg.width - 20;
        innerKuang.height = innerbg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(10,5);

        let itemContainer = new BaseDisplayObjectContainer();

        //第几名
        let officeBg = BaseBitmap.create("public_ts_bg01");
        officeBg.width = 250;
        officeBg.x = innerbg.width/2 - officeBg.width/2;
        officeBg.y = 15;

        let txt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BROWN);
        if (Number(id) < 4)
        {
            txt.text =LanguageManager.getlocal("acRank_rank"+id);
        }else
        {
            txt.text =LanguageManager.getlocal("acRank_rank4",[String(rItem.minRank),String(rItem.maxRank) ] );
        }
        txt.width =230;
        txt.x = innerbg.width/2 - txt.width/2;
        txt.textAlign ="center";
        txt.y = scroStartY + 20 - txt.height/2;  
		

        
        let firstTop = BaseBitmap.create("acarrowfirsttop");
        firstTop.x = innerbg.width/2- firstTop.width/2;
        firstTop.y = -3;

        
        let addH = 10; 
        let tmpX = 23;
        let scaleNum = 1;

        if(Number(id) == 1){
            scroStartY +=75;  
            this.addChild(firstTop);
            scaleNum = 0.8
            tmpX = 250;

            let maskbg = BaseBitmap.create("public_9v_bg01");
            maskbg.x = 5;
            maskbg.y = 30;
            maskbg.width = 230;
            maskbg.height = 680;
            maskbg.name = "maskbg";
            this.addChild(maskbg);
            let userPic = 1;
            let nameString = LanguageManager.getlocal("acOneYearRank_name_noone");
            // console.log(type(rankFirstInfo));
            let rankFirstInfo = this.vo.getPrankList()[0];
            if(rankFirstInfo!=null){
                if(rankFirstInfo.pic){
                    userPic = rankFirstInfo.pic;
                }
                if(rankFirstInfo.name){
                    nameString = LanguageManager.getlocal("acwipeBossPlayerName",[rankFirstInfo.name]);
                }
            }
            let roleNode = Api.playerVoApi.getPlayerPortrait(this.cfg.mainReward,userPic);
            roleNode.y =30;
            roleNode.x = 0;
            roleNode.setScale(0.8);
            this.addChild(roleNode);
            roleNode.mask = maskbg;

            let nameStr = ComponentManager.getTextField(nameString,20,TextFieldConst.COLOR_BROWN);
            nameStr.x = tmpX;
            nameStr.y = 85;
            this.addChild(nameStr);

            if(rankFirstInfo && rankFirstInfo.name){
                let scoreStr = ComponentManager.getTextField((LanguageManager.getlocal('acConquerMainLandScore-1')+': '+App.StringUtil.changeIntToText(rankFirstInfo.score)) ,20,TextFieldConst.COLOR_BROWN);
                scoreStr.x = tmpX;
                scoreStr.y = nameStr.y + nameStr.height + 10;
                this.addChild(scoreStr);
            }


        }else{
            this.addChild(officeBg);
            this.addChild(txt);

        }

        
        let rIcons = rItem.rewardIcons;
            
        scroStartY += 40;
        
        let widLendth = 600;
        let stX = 0;
        let stY =0;
        let lineNum = 5;
        if(id == '1'){
            lineNum = 4;
        }
        for (var idx = 0; idx < rIcons.length; idx++) {
            var element = rIcons[idx];
            element.setScale(scaleNum);
            element.x = stX;
            element.y = stY;
            stX +=  (element.width*element.scaleX+8);
            //换行处理
            if (idx>= lineNum && idx % lineNum == 0)
            {
                stX = 0;
                addH += element.height + 5;
                 if(Number(id) == 1){
                    addH = addH - 5;
                }
                stY += element.height*element.scaleY + 15;
                element.x = stX;
                element.y = stY;
                stX += (element.width*element.scaleX+8);
            }
            itemContainer.addChild(element);
        }

        let rectWidth = 600;
        let rectHeight = 320;
        let rectX = 30;
        let rectY = 60;
        if(id == '1'){
            rectWidth = 400;
            rectHeight = 250;
            rectX = 240;
            rectY = 150;
        }

        this.addChild(itemContainer);
        itemContainer.setPosition(rectX,rectY)
      
        innerbg.height = itemContainer.y + itemContainer.height + 40;
        innerKuang.height = innerbg.height-10;

        this.height = innerbg.height + 10;
    }

    public getSpaceX():number
	{
		return 0;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 15;
	}
    public dispose():void
    {
        super.dispose();
    }
}