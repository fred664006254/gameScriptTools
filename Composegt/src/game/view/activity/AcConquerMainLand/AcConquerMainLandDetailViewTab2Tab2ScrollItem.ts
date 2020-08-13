/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcArrowRankListScrollItem
 */
class AcConquerMainLandDetailViewTab2Tab2ScrollItem  extends ScrollListItem
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
        innerbg.height = 380;
        if(id == '1'){
            innerbg.height = 420; 
        }
        innerbg.x = 0;
        innerbg.y = scroStartY-10;
        this.addChild(innerbg);

        
        let innerKuang = BaseBitmap.create("public_9v_bg12"); 
        innerKuang.width = innerbg.width - 20;
        innerKuang.height = innerbg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(10,5);

        //第几名
        let officeBg = BaseBitmap.create("public_ts_bg01");
        officeBg.width = 250;
        officeBg.x = innerbg.width/2 - officeBg.width/2;
        officeBg.y = 15;
        
        let itemContainer = new BaseDisplayObjectContainer();

        //第几名
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


        
        
        let addH = 10; 
        let scaleNum = 1;

        if(Number(id) == 1){
            let winbg = BaseBitmap.create("accrossserverwipeboss_rankbg");
            winbg.x = GameConfig.stageWidth/2 - winbg.width/2;
            winbg.y = innerbg.y +25;
            this.addChild(winbg);

            let red1 = BaseBitmap.create("accrossserverwipeboss_rank1");
            red1.x = winbg.x - red1.width/2;
            red1.y = winbg.y + winbg.height/2 - red1.height/2;
            this.addChild(red1);

            let server = LanguageManager.getlocal("acOneYearRank_name_noone");
            if(this.vo.getWinServer()){
                server = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, this.vo.getWinServer());
            }
        
            let serverTxt = ComponentManager.getTextField(server,24,TextFieldConst.COLOR_LIGHT_YELLOW);
            serverTxt.x = winbg.x + winbg.width/2 - serverTxt.width/2;
            serverTxt.y = winbg.y + winbg.height/2 - serverTxt.height/2;
            this.addChild(serverTxt);
        }else{
            this.addChild(officeBg);
            this.addChild(txt);

        }

        
        let rIcons = rItem.rewardIcons;
        scroStartY += 40;
        
        let stX = 0;
        let stY =0;
        let lineNum = 5;
        scaleNum = 1;
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
        let rectHeight = 280;
        let rectX = 30;
        let rectY = 60;
        if(id == '1'){
            rectY = 100;
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