/**
 * 特殊道具使用成功，门客弹出UI
 * author yanyuling
 * date 2017/12/20
 * @class ItemUseSuccessView
 */

class ItemUseSuccessView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}
	
	public initView():void
	{
        let servantIdList = this.param.data[0];
        let useNum = this.param.data[1];
        let itemVo = <ItemInfoVo>this.param.data[2];
        let itemName = itemVo.name;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

        let bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth - 200;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height-2;
        this._nodeContainer.addChild(bottomBg);

        let closeBtn  = ComponentManager.getButton("commonview_closebtn1","",this.hide,this);
		closeBtn.x = this.viewBg.width - closeBtn.width ;
        closeBtn.y = bottomBg.y - closeBtn.height/2 - 25;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        let titleFlag = BaseBitmap.create("itemuse_succeed");
        titleFlag.x = bottomBg.x + bottomBg.width/2 - titleFlag.width/2;
        titleFlag.y =  bottomBg.y-titleFlag.height/2 - 15;
        this._nodeContainer.addChild(titleFlag);

        let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
        tipTxt.text = LanguageManager.getlocal("itemUse_speciatTip" ,[useNum,itemName]);
        tipTxt.x = bottomBg.x + bottomBg.width/2 - tipTxt.width/2;
        tipTxt.y = bottomBg.y + 45;
        this._nodeContainer.addChild(tipTxt);

        let scrollH = bottomBg.height - 100;
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);
        let tmpNode = new BaseDisplayObjectContainer();
        let StartY = 20;
        let StartX= -10;

        
        let serObj = {}
        let Len =  servantIdList.length;
        for (let idx = 0; idx < Len; idx++) {
            serObj[String(idx)] = servantIdList[idx];
        }

        let isWife = false;
        if(itemVo.id  == 1361 || itemVo.id == 1362|| itemVo.id == 1363)
        {
            isWife = true;
        }
        let vList = Object.keys(serObj);
        let index = 0;
        while(vList.length > 0)
        {
            let tmpK = vList[App.MathUtil.getRandom(0,vList.length)];
            let sbg = BaseBitmap.create("studyatk_servant_bg");
            sbg.y = StartY;
            sbg.width = 368;
            sbg.height = 368;
            if(index%2 == 0)
            {
                sbg.x = StartX;
            }else{
                sbg.x = GameConfig.stageWidth - StartX - sbg.width;
                
                if(isWife)
                {
                    // StartY += 270;
                    StartY += 340;
                }else{
                    // StartY += 230;
                    StartY += 340;
                }
            }
            tmpNode.addChild(sbg);

            let circleImg =  BaseBitmap.create("studyatk_booklv_circle"); 
            circleImg.anchorOffsetX = circleImg.width/2;
            circleImg.anchorOffsetY = circleImg.height/2;
            // circleImg.setScale(0.5);
            circleImg.x = sbg.x + sbg.width/2;
            circleImg.y = sbg.y + sbg.height/2;
            
            let light1 =  BaseBitmap.create("studyatk_booklv_light1"); 
            light1.anchorOffsetX = light1.width/2;
            light1.anchorOffsetY = light1.height/2;
            light1.x = sbg.x + sbg.width/2;
            light1.y = sbg.y + sbg.height/2;
            // light1.setScale(1.18);
            light1.setScale(2.18);
            tmpNode.addChild(light1);

            let light2 =  BaseBitmap.create("studyatk_booklv_light2"); 
            light2.anchorOffsetX = light2.width/2;
            light2.anchorOffsetY = light2.height/2;
            light2.x = light1.x;
            light2.y = light1.y;
            light2.setScale(light1.scaleX);
            tmpNode.addChild(light2);

            tmpNode.addChild(circleImg);

            egret.Tween.get(circleImg,{loop:true}).to({scaleX:1.25,scaleY:1.25},1000).to({scaleX:2.0,scaleY:2.0,alpha:0},1000).set({scaleX:0.5,scaleY:0.5,alpha:1});
            egret.Tween.get(light1,{loop:true}).to({rotation:360},15000);
            egret.Tween.get(light2,{loop:true}).to({rotation:-360},15000);

            let serInfo = null;
            let servantId = "";
            for (var key in serObj[tmpK]) {
                servantId = key;
                serInfo = serObj[tmpK][key];
            }
            let resPath = "servant_full_"+ servantId;
            if(isWife)
            {
                let wifeCfg = Config.WifeCfg.getWifeCfgById(servantId);
                resPath = wifeCfg.body;;
            }
            let simg = BaseLoadBitmap.create(resPath);
             let mask = egret.Rectangle.create();
            if(isWife)
            {
                let wifeCfg = Config.WifeCfg.getWifeCfgById(servantId);
                resPath = wifeCfg.body;;
                // simg.width = 540;
                // simg.height = 760;
                // mask.setTo(0,0,540,500);

                simg.width = 405;
                simg.height = 531; //840 * (405 / 640);
                mask.setTo(0,0,405,400);
            }else
            {
                simg.width = 640;
                simg.height = 482;
                mask.setTo(0,0,640,400);
            }
            simg.mask = mask; 
            simg.anchorOffsetX = simg.width/2;
            simg.anchorOffsetY = simg.height/2;
            simg.setScale(0.7);
            simg.x = sbg.x + sbg.width/2;
            simg.y = sbg.y + sbg.height/2-10;
            tmpNode.addChild(simg);

            let bookBg = BaseBitmap.create("wifeview_wenzibg2");
            // bookBg.scaleY = 1.7;
            bookBg.height = 60;
            bookBg.x = sbg.x + sbg.width/2 - bookBg.width/2;
            bookBg.y = sbg.y + sbg.height-95;
            if(isWife)
            {
                bookBg.y -=10;
            }
            tmpNode.addChild(bookBg);

            let attrY = bookBg.y + 12;
            for (var proIdx = 0; proIdx < serInfo.length; proIdx++) {
                let rewInfo:RewardItemVo = GameData.formatRewardItem(serInfo[proIdx])[0];

                let attrV = servantIdList[servantId];
                let addAttrTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN2);
                addAttrTxt.text =  rewInfo.message ;
                addAttrTxt.x = bookBg.x + bookBg.width/2 - addAttrTxt.width/2;
                if(serInfo.length == 1)
                {
                    addAttrTxt.y = bookBg.y + bookBg.height/2*bookBg.scaleY - addAttrTxt.height/2;
                }else{
                    addAttrTxt.y = attrY-5;
                    attrY = attrY + 25;
                }
                
                tmpNode.addChild(addAttrTxt);
             }
           
            index ++;
            delete serObj[tmpK];
            vList = Object.keys(serObj);
        }

        let scrollView = ComponentManager.getScrollView(tmpNode,rect);
        scrollView.y = bottomBg.y + 80;
        scrollView.bounces = false;
          scrollView.horizontalScrollPolicy = "off"; 
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    }

    protected clickHandler()
    {
        super.hide()
    }
    protected getTitleStr():string
	{
		return null;
	}
     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "studyatk_servant_bg","popupview_closebtn1",
            "studyatk_booklv_circle","studyatk_booklv_light1","studyatk_booklv_light2",
            "wifeview_wenzibg2"
        ]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		super.dispose();
	}
}
