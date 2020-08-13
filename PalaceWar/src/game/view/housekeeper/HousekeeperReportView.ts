/**
 * 管家发送请求
 * author shaoliang
 * date 2020/4/28
 * @class HousekeeperReportView
 */

class HousekeeperReportView  extends BaseView
{
    

    public constructor() {
		super();
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "public_9_wordbg","housekeeperreportview"
		]);
	}

    public initView():void
    {
        let bg = BaseBitmap.create("public_9_wordbg");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth-245;
        bg.y = 140;
        this.addChild(bg);

        let titlebg = BaseBitmap.create("housekeeperreport_titlebg");
        titlebg.setPosition(GameConfig.stageWidth/2-titlebg.width/2,bg.y-80);
        this.addChild(titlebg);

        let title = BaseBitmap.create("housekeeperreport_title");
        title.setPosition(GameConfig.stageWidth/2-title.width/2,bg.y-59);
        this.addChild(title);

        let btn =	ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		btn.setPosition(GameConfig.stageWidth/2-btn.width/2,bg.y+bg.height+16);
        this.addChild(btn);


        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,bg.height-60);

        let scrollContainer = new BaseDisplayObjectContainer();

		let scrollView = ComponentManager.getScrollView(scrollContainer,rect);
        scrollView.y = bg.y+50;
		this.addChild(scrollView);

        let timesArray:string[] = this.getTimesStr();

        let rewardsArray:any[] = this.getRewardStr();

        let posy = 5;
        for (let i = 0; i < timesArray.length; i+=2)
        {   
            let text1 = ComponentManager.getTextField(timesArray[i],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            text1.width = 270;
            text1.lineSpacing = 4;
            text1.setPosition(60,posy);
            scrollContainer.addChild(text1);

            posy += (text1.height+12);

            if (timesArray[i+1])
            {   
                let text2 = ComponentManager.getTextField(timesArray[i+1],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
                text2.width = 270;
                text2.lineSpacing = 4;
                text2.setPosition(338,text1.y);
                scrollContainer.addChild(text2);

                if (text2.y+text2.height+12>posy)
                {
                    posy = text2.y+text2.height+12;
                }
            }
        }

        if (timesArray.length == 0)
        {
            let text1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_empty_tip1"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            text1.width = 600;
            text1.lineSpacing = 4;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition(20,posy);
            scrollContainer.addChild(text1);
             posy += (text1.height+12);
        }

        let line = BaseBitmap.create("housekeeperreport_line");
        line.setPosition(GameConfig.stageWidth/2-line.width/2,posy+8);
        scrollContainer.addChild(line);

        posy = line.y+33;

        for (let i = 0; i < rewardsArray.length; i+=2)
        {   
            let onerevo = rewardsArray[i];
            let text1 = ComponentManager.getTextField(onerevo[0],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_YELLOW);
            text1.width = 270;
            text1.lineSpacing = 4;
            text1.setPosition(60,posy);
            scrollContainer.addChild(text1);

            posy += (text1.height+12);

            if (onerevo[2] == 1)
            {
                let itemvo:RewardItemVo = onerevo[1];
                if (itemvo.num < 0)
                {
                    text1.textColor = TextFieldConst.COLOR_QUALITY_RED;
                }
            }

            if (rewardsArray[i+1])
            {   
                let onerevo2 = rewardsArray[i+1];
                let text2 = ComponentManager.getTextField(onerevo2[0],TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_YELLOW);
                text2.width = 270;
                text2.lineSpacing = 4;
                text2.setPosition(338,text1.y);
                scrollContainer.addChild(text2);

                if (text2.y+text2.height+12>posy)
                {
                    posy = text2.y+text2.height+12;
                }

                if (onerevo2[2] == 1)
                {
                    let itemvo2:RewardItemVo = onerevo2[1];
                    if (itemvo2.num < 0)
                    {
                        text2.textColor = TextFieldConst.COLOR_QUALITY_RED;
                    }
                }
            }
        }
        if (rewardsArray.length == 0)
        {
            let text1 = ComponentManager.getTextField(LanguageManager.getlocal("housekeeper_empty_tip2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            text1.width = 600;
            text1.lineSpacing = 4;
            text1.textAlign = egret.HorizontalAlign.CENTER;
            text1.setPosition(20,posy);
            scrollContainer.addChild(text1);
             posy += (text1.height+12);
        }
        scrollContainer.height = posy;
    }


    private getTimesStr():string[]
    {
        let timess:string[]=[];
        let info = this.param.data.info;
        for (let k in info)
        {
            let oneInfo = info[k];
            if (oneInfo.times)
            {
                timess.push(LanguageManager.getlocal("housekeeper_times_"+k,[String(oneInfo.times),"0x3e9b00"]));
            }
        }

        return timess;
    }

    private getRewardStr():any[]
    {
        let rewardsArray:any[]=[];
        let info = this.param.data.info;
        let rewardsstr:string = "";

          //this._rewardInfo["manage"] = {"times":times,"gold":num1,"food":num2,"soldier":num3,"practice":num4};
        if (info.manage)
        {
            if (info.manage.gold)
            {   
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("2_0_"+info.manage.gold );
            }

            if (info.manage.food)
            {   
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("3_0_"+info.manage.food );
            }

            if (info.manage.soldier)
            {   
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("4_0_"+info.manage.soldier );
            }

            if (info.manage.practice)
            {   
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("31_0_"+info.manage.practice );
            }
        }

        //红颜经验
        //
        let wifechildnumobj = {};
        if (info.wife && info.wife.autoCallWife)
        {
            for (let k in info.wife.autoCallWife)
            {
                let oneInfo = info.wife.autoCallWife[k];
                let wifeid = oneInfo[0];
                
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("13_"+wifeid+"_"+oneInfo[1]);
                if (oneInfo[3])
                {
                    if (wifechildnumobj[wifeid])
                    {
                        wifechildnumobj[wifeid]++;
                    }
                    else
                    {
                        wifechildnumobj[wifeid] = 1;
                    }
                }
            }
        }
        //  门客
        if (info.bookroom && info.bookroom.bookroom_poss)
        {
            for (let k in info.bookroom.bookroom_poss)
            {
                let oneInfo = info.bookroom.bookroom_poss[k];
                let servantid = oneInfo.sid;
                let cfg = Config.ServantCfg.getServantItemById(servantid);

                let rate = 1;
                if (oneInfo.pos)
                {
                    rate = oneInfo.pos;
                }
                if (Api.otherInfoVoApi.isHasScene("204","cityScene"))
                {
                    let abilitycfg:any = Config.SceneCfg.getSceneCfgBySceneName("cityScene","204").personalityCfg;
                    rate = rate*(1+abilitycfg.buffValue);
                }

                let bookCfg = GameConfig.config.bookroomCfg;
                let v1 = Math.floor(bookCfg.getBookExp*rate+0.5);
                let v2 = Math.floor(bookCfg.getSkillExp*rate+0.5);

                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += ("14_"+servantid+"_"+v1 + "|15_"+servantid+"_"+v2);
            }
        }


        for (let k in info)
        {
            let oneInfo = info[k];
            if (oneInfo.rewards)
            {
                if (rewardsstr != "")
                {
                    rewardsstr += "|";
                }
                rewardsstr += oneInfo.rewards;
            }
        }
        let rewardsvo = GameData.formatRewardItem(rewardsstr,true);

        rewardsvo.sort((a:RewardItemVo,b:RewardItemVo)=>{

            let sortIdA = a.type;
            let sortIdB = b.type;

            if (a.type >=12 && a.type<=15)
            {
                sortIdA =1000000;
            }
            if (b.type >=12 && b.type<=15)
            {
                sortIdB =1000000;
            }

            if (a.type==5)
            {
                sortIdA =1.5;
            }
            if (b.type ==5)
            {
                sortIdB =1.5;
            }

            if (a.type==31)
            {
                sortIdA =5;
            }
            if (b.type ==31)
            {
                sortIdB =5;
            }


            return sortIdA-sortIdB;

        });

        for (let i = 0 ; i<rewardsvo.length; i++ )
        {
            let onevo = rewardsvo[i];
            if (onevo && onevo.num)
            {
                let str = onevo.getFullTip();
                if (onevo.type == 13 && wifechildnumobj[String(onevo.id)])
                {
                    str += LanguageManager.getlocal("housekeeper_wifechild",[String(wifechildnumobj[String(onevo.id)])]);
                }
                rewardsArray.push([str,onevo,1]);
            }
        }

        //书院学习
        // if (info.bookroom && info.bookroom.sids)
        // {
        //     for (let i=0; i<info.bookroom.sids.length; i++)
        //     {
        //         let sid = info.bookroom.sids[i];
        //         let scfg = Config.ServantCfg.getServantItemById(sid);
        //         if (scfg)
        //         {
        //             let str = LanguageManager.getlocal("housekeeper_bookroom_study",[scfg.name]);
        //             rewardsArray.push([str,scfg,2]);
        //         }
        //     }
        // }

         //寻访事件
        if (info.child && info.child.levelinfo)
        {
            for (let i=0; i<info.child.levelinfo.length; i++)
            {
                let str = info.child.levelinfo[i];
                if (str)
                {
                    rewardsArray.push([str,{},3]);
                }
            }
        }

        //寻访事件s
        if (info.search && info.search.showArr)
        {
            for (let i=0; i<info.search.showArr.length; i++)
            {
                let str = info.search.showArr[i];
                if (str)
                {
                    rewardsArray.push([str,{},4]);
                }
            }
        }

        

        return rewardsArray;
    }
}
