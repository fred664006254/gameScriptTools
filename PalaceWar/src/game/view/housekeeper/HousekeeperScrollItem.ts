/**
 * 管家节点
 * author shaoliang
 * date 2020/4/23
 * @class HousekeeperScrollItem
 */
class HousekeeperScrollItem  extends ScrollListItem
{
    private _type:string = null;
    private _checkBox:BaseBitmap = null;
    private _isCheck:boolean = false;
    //是否有参数
    private _hasParms:boolean = false;

    //下拉菜单
    private _dropDownContainer:BaseDisplayObjectContainer = null;
	private _dropDownBtn:BaseButton = null;
	private _dropDownFlag:BaseBitmap = null;
    private _dropBtnList:BaseButton[] = [];
	private _lastDropIdx:number=1;
    private _dropCfg:string[] = [];
    

    //选择按钮
    private _chooseBtn:BaseButton = null;
    private _descText:BaseTextField = null;


    private _checkBox1:BaseBitmap = null;
    private _isCheck1:boolean = false;
    private _checkBox2:BaseBitmap = null;
    private _isCheck2:boolean = false;

    //拖动条
    private _dragNum:number = 0;
    private _dragText1:BaseTextField = null;
    private _dragText2:BaseTextField = null;

    private _infoNode:BaseDisplayObjectContainer = null;
    private _touchObj:any[] = [];

    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:string)
    {
        this._type = data;

        let node = new BaseDisplayObjectContainer();
        this.addChild(node);
        this._infoNode = node;

        let bg = BaseBitmap.create("public_scrollitembg");
        bg.x = GameConfig.stageWidth/2-bg.width/2;
        node.addChild(bg);;

        let itemNameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
        itemNameBg.x = bg.x + 6;
        itemNameBg.y = 18;
        itemNameBg.width = 240;
        node.addChild(itemNameBg);

        let namestr = LanguageManager.getlocal("housekeeper_type_"+data);
        let itemNameTF:BaseTextField = ComponentManager.getTextField(namestr,TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        itemNameTF.x = bg.x + 20;
        itemNameTF.y = itemNameBg.y + itemNameBg.height/2 - itemNameTF.height/2;
        node.addChild(itemNameTF);

        this._isCheck = Api.housekeeperVoApi.getIsCheckByType(data);
        let checkbox = BaseBitmap.create( this._isCheck ? "housekeeperview_check2":"housekeeperview_check1");
        checkbox.setPosition(bg.x+530,15);
        this.addChild(checkbox);
        this._checkBox = checkbox;
        checkbox.addTouchTap(this.checkHandle,this);

        let lockStr:string = null;
        if (this._type == "manage")
        {
            if(Api.playerVoApi.getPlayerLevel()< Config.ManageCfg.autoNeedLv)
            {
                lockStr =  LanguageManager.getlocal("manageDes");
            }
        }
        else if (this._type == "search")
        {
            if (!Api.searchVoApi.isShowNpc())
            {
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical",[Api.playerVoApi.getPlayerOfficeByLevel(Config.SearchbaseCfg.needLv)]);
            }
        }
        else if (this._type == "prison")
        {
            if (!Api.prisonVoApi.isShowNpc())
            {   
                let unlock  =Config.PrisonCfg.getIndexPrisonItemCfg(1).unlock/41;
                lockStr = LanguageManager.getlocal("housekeeper_locked_prison",[String(unlock)]);
            }
        }
        else if (this._type == "conquest")
        {
            if (!Api.conquestVoApi.isShowNpc())
            {   
                lockStr = LanguageManager.getlocal("housekeeper_locked_prison",[String(80)]);
            }
            else
            {
                let data = Api.conquestVoApi.getConquestVo();

                if(data.tnum < 50 )
                {
                    lockStr = LanguageManager.getlocal("housekeeper_locked_prison2");
                }
            }
        }
        else if (this._type == "trade")
        {
            if (!Api.tradeVoApi.isShowNpc())
            {   
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical",[Api.playerVoApi.getPlayerOfficeByLevel(GameConfig.config.tradebaseCfg.unlock)]);
            }
            else
            {

                if(!Api.tradeVoApi.isBatchEnable())
                {
                    lockStr = LanguageManager.getlocal("tradeBatchTip");
                }
            }
        }
        else if (this._type == "zhenqifang")
        {
            if (!Api.zhenqifangVoApi.isShowNpc())
            {   
                lockStr = LanguageManager.getlocal("emoticonUnlockOffical",[Api.playerVoApi.getPlayerOfficeByLevel(Config.ServantweaponCfg.lvNeed)]);
            }
        }
        else if (this._type == "child")
        {
            if (!Api.childVoApi.isShowNpc())
            {
                lockStr = LanguageManager.getlocal("housekeeper_locked_child");
            }
            
        }

        if (lockStr)
        {
            let descText:BaseTextField = ComponentManager.getTextField(lockStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);
            checkbox.visible = false;
        }

        if (data == "manage"  && !lockStr)
        {
            let descstr = Api.switchVoApi.isPracticeOPen() ? LanguageManager.getlocal("housekeeper_desc_manage") : LanguageManager.getlocal("housekeeper_desc_manage2s");
            let descText:BaseTextField = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);
        }
        else if (data == "prison" && !lockStr)
        {
            let descstr = LanguageManager.getlocal("housekeeper_desc_"+data);
            let descText:BaseTextField = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);
        }
        else if ( data == "wife" )
        {
            let descstr = LanguageManager.getlocal("housekeeper_desc_"+data);
            let descText:BaseTextField = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.width = 550;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);


            let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            this._isCheck1 = (parmsstr=="1");

            let checkbox1 = BaseBitmap.create( this._isCheck1 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox1.setPosition(bg.x+530,descText.y+descText.height/2-checkbox1.height/2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1,this);

            this._touchObj.push(checkbox1);

        }
        else if (data == "affair")//公务
        {
            let descstr = LanguageManager.getlocal("housekeeper_desc_"+data);
            let descText:BaseTextField = ComponentManager.getTextField(descstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.width = 190;
            descText.lineSpacing = 4;
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);

            let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            if (parmsstr && parmsstr != "")
            {
                this._lastDropIdx = Number(parmsstr);
            }
            
            this.createDrop();
        }
        else if (data == "child"  && !lockStr)//子嗣
        {
            bg.height = 168;
            let descstr1 = LanguageManager.getlocal("housekeeper_desc_child1");
            let descstr2 = LanguageManager.getlocal("housekeeper_desc_child2");
            let descstr3 = LanguageManager.getlocal("housekeeper_desc_child3");

            let descText1:BaseTextField = ComponentManager.getTextField(descstr1,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText1.setPosition(itemNameTF.x,60);
            node.addChild(descText1);

            let descText2:BaseTextField = ComponentManager.getTextField(descstr2,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText2.setPosition(itemNameTF.x,95);
            node.addChild(descText2);

            let descText3:BaseTextField = ComponentManager.getTextField(descstr3,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText3.setPosition(itemNameTF.x,130);
            node.addChild(descText3);

            let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            let parmsArr = parmsstr.split("|");
            this._isCheck1 = (parmsArr[0]=="1");
            this._isCheck2 = (parmsArr[1]=="1");

            let checkbox1 = BaseBitmap.create( this._isCheck1 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox1.setPosition(bg.x+530,descText1.y+descText1.height/2-checkbox1.height/2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1,this);

            let checkbox2 = BaseBitmap.create( this._isCheck2 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox2.setPosition(bg.x+530,descText2.y+descText2.height/2-checkbox2.height/2);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2,this);

            this._touchObj.push(checkbox1);
            this._touchObj.push(checkbox2);


            if (parmsArr[2] && parmsArr[2] != "")
            {
                this._lastDropIdx = Number(parmsArr[2]);
            }
            
            this.createDrop();

        }
        else if (data == "search"  && !lockStr)//寻访
        {   
            // let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            // let parmsArr = parmsstr.split("|");
            // if (parmsArr[0] && parmsArr[0] != "")
            // {
            //     this._dragNum = Number(parmsArr[0]);
            // }
            // else
            // {
            //     this._dragNum = 90;
            // }
            // this._isCheck1 = (parmsArr[1]=="1");
            // this._isCheck2 = (parmsArr[2]=="1");
            this._dragNum = Api.searchVoApi.getAutosetValue();
            this._isCheck1 = Boolean(Api.searchVoApi.getGoldOpen());
            this._isCheck2 = Boolean(Api.searchVoApi.getFoodOpen());

            let descstr1 = LanguageManager.getlocal("housekeeper_desc_search1",[String(this._dragNum)]);
            let descText1:BaseTextField = ComponentManager.getTextField(descstr1,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth/2 -descText1.width/2,50);
            node.addChild(descText1);
            this._dragText1 =descText1;

            let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress20_bg",90,this.dragCallback,this,null,null,null,this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y+descText1.height + 10;
            node.addChild(dragProgressBar);

            this._touchObj.push(dragProgressBar);

            let line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth/2 -line.width/2,113);
            node.addChild(line);

            let descstr2 = LanguageManager.getlocal("housekeeper_desc_search2");
            let descstr3 = LanguageManager.getlocal("housekeeper_desc_search3");
            let descstr4 = LanguageManager.getlocal("housekeeper_desc_search4",[App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold())]);
            let descstr5 = LanguageManager.getlocal("housekeeper_desc_search5",[App.StringUtil.changeIntToText(Api.playerVoApi.getFood())]);

            let descText2:BaseTextField = ComponentManager.getTextField(descstr2,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText2.width = 152;
            descText2.lineSpacing = 3;
            // descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(bg.x+30,line.y+30);
            node.addChild(descText2);

            let descText3:BaseTextField = ComponentManager.getTextField(descstr3,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText3.width = 160;
            descText3.lineSpacing = 3;
            // descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(bg.x+365,descText2.y);
            node.addChild(descText3);

            let descText4:BaseTextField = ComponentManager.getTextField(descstr4,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText4.width = 220;
            descText4.lineSpacing = 3;
            // descText4.textAlign = egret.HorizontalAlign.CENTER;
            descText4.setPosition(descText2.x,descText2.y+descText2.height+10);
            node.addChild(descText4);

            let descText5:BaseTextField = ComponentManager.getTextField(descstr5,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText5.width = 220;
            descText5.lineSpacing = 3;
            // descText5.textAlign = egret.HorizontalAlign.CENTER;
            descText5.setPosition(descText3.x,descText3.y+descText3.height+10);
            node.addChild(descText5);

            bg.height = Math.max(descText4.y+descText4.height,descText5.y+descText5.height)+16;

            let checkbox1 = BaseBitmap.create( this._isCheck1 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox1.setPosition(descText2.x+descText2.width,descText2.height/2+descText2.y-checkbox1.height/2);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1,this);

            let checkbox2 = BaseBitmap.create( this._isCheck2 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox2.setPosition(descText3.x+descText3.width,checkbox1.y);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2,this);

            this._touchObj.push(checkbox1);
            this._touchObj.push(checkbox2);
        }
        else if (data == "bookroom")//书院
        {
            
            let descText:BaseTextField = ComponentManager.getTextField("ABC",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText.setPosition(itemNameTF.x,83-descText.height/2);
            node.addChild(descText);
            this._descText = descText;

            this.resetDesc();

            let choosebtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"allianceWarSelectServantPopupViewTitle",()=>{

                ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERSERVANTPOPUPVIEW,{f:this.bookroomSaveParms,o:this});
            },this);
            choosebtn.setPosition(bg.x+442,descText.y+descText.height/2-choosebtn.height/2);
            node.addChild(choosebtn);

            this._touchObj.push(choosebtn);
    
        }
        else if (data == "conquest"  && !lockStr)//征伐
        {
            let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            let parmsArr = parmsstr.split("|");
            let cid  = Api.conquestVoApi.getCid();
            if (cid > Config.ConquestCfg.getMaxLength())
            {
                cid = Config.ConquestCfg.getMaxLength();
            }
            if (parmsArr[0] && parmsArr[0] != "")
            {
                this._dragNum = Number(parmsArr[0]);
            }
            else
            {
                this._dragNum = 1;
            }
            // this._dragNum = Math.max(this._dragNum,cid);

            let descstr1 = LanguageManager.getlocal("housekeeper_desc_conquest1",[String(this._dragNum)]);
            let descText1:BaseTextField = ComponentManager.getTextField(descstr1,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth/2 -descText1.width/2,50);
            node.addChild(descText1);
            this._dragText1 =descText1; 

            let maxNum = Config.ConquestCfg.getMaxLength();

            let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress20_bg",maxNum,this.dragCallback,this,null,1,null,this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y+descText1.height + 10;
            node.addChild(dragProgressBar);

             this._touchObj.push(dragProgressBar);

            let num1 = 0;
            if (this._dragNum>=Api.conquestVoApi.getCid())
            {
                num1 = Api.conquestVoApi.getAttCostNum2(Api.conquestVoApi.getCid(),this._dragNum-Api.conquestVoApi.getCid()+1);
            }
            let num2 = Api.playerVoApi.getSoldier();
            let cost1 = App.StringUtil.changeIntToText(num1);
		    let cost2 = App.StringUtil.changeIntToText(num2);
            let descstr2 :string;
            if (num1>num2 )
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2_2",[cost2.toString()]);
            }
            else
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2",[cost1.toString(),cost2.toString()]);
            }
            
            let descText2:BaseTextField = ComponentManager.getTextField(descstr2,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText2.width = 580;
            descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(GameConfig.stageWidth/2 -descText2.width/2,120);
            node.addChild(descText2);
            this._dragText2 =descText2; 

            let line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth/2 -line.width/2,143);
            node.addChild(line);

            let descstr3 = LanguageManager.getlocal("housekeeper_desc_conquest3");
            let descText3:BaseTextField = ComponentManager.getTextField(descstr3,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText3.width = 580;
            descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(GameConfig.stageWidth/2 -descText3.width/2,line.y+line.height+6);
            node.addChild(descText3);
            
            bg.height = descText3.y+descText3.height+16;
        }
        else if (data == "trade"  && !lockStr)//商贸
        {
             let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            let parmsArr = parmsstr.split("|");
            if (parmsArr[0] && parmsArr[0] != "")
            {
                this._dragNum = Number(parmsArr[0]);
            }
            else
            {
                this._dragNum = 1;
            }
            let cid = Number(Api.tradeVoApi.getCurrentCid());
            if (cid > Config.TradeCfg.getMaxTradeIndex())
            {
                cid = Config.TradeCfg.getMaxTradeIndex();
            }
            // this._dragNum = Math.max(this._dragNum,cid);

            let descstr1 = LanguageManager.getlocal("housekeeper_desc_trade1",[String(this._dragNum)]);
            let descText1:BaseTextField = ComponentManager.getTextField(descstr1,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText1.width = 580;
            descText1.textAlign = egret.HorizontalAlign.CENTER;
            descText1.setPosition(GameConfig.stageWidth/2 -descText1.width/2,50);
            node.addChild(descText1);
            this._dragText1 =descText1; 

            let maxNum = Config.TradeCfg.getMaxTradeIndex();
            let dragProgressBar:DragProgressBar = ComponentManager.getDragProgressBar("progress2","progress20_bg",maxNum,this.dragCallback,this,null,1,null,this._dragNum);
            dragProgressBar.x = 179;
            dragProgressBar.y = descText1.y+descText1.height + 10;
            node.addChild(dragProgressBar);

             this._touchObj.push(dragProgressBar);

            let num1 = 0;
            if (this._dragNum>=Number(Api.tradeVoApi.getCurrentCid()))
            {
                num1 = Api.tradeVoApi.getAttCostNum2(Number(Api.tradeVoApi.getCurrentCid()),this._dragNum-Number(Api.tradeVoApi.getCurrentCid())+1);
            }
            let num2 = Api.playerVoApi.getPlayerGold();
            let cost1 =	 App.StringUtil.changeIntToText(num1);
		    let cost2 =  App.StringUtil.changeIntToText(num2);
            let descstr2 :string;
            if (num1>num2 )
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2_2",[cost2.toString()]);
            }
            else
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2",[cost1.toString(),cost2.toString()]);
            }
            let descText2:BaseTextField = ComponentManager.getTextField(descstr2,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText2.width = 580;
            descText2.textAlign = egret.HorizontalAlign.CENTER;
            descText2.setPosition(GameConfig.stageWidth/2 -descText2.width/2,120);
            node.addChild(descText2);
            this._dragText2 =descText2; 

            let line = BaseBitmap.create("settingview_line");
            line.setPosition(GameConfig.stageWidth/2 -line.width/2,143);
            node.addChild(line);

            let descstr3 = LanguageManager.getlocal("housekeeper_desc_trade3");
            let descText3:BaseTextField = ComponentManager.getTextField(descstr3,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText3.width = 580;
            descText3.textAlign = egret.HorizontalAlign.CENTER;
            descText3.setPosition(GameConfig.stageWidth/2 -descText3.width/2,line.y+line.height+6);
            node.addChild(descText3);
            
            bg.height = descText3.y+descText3.height+16;
        }
        else if (data == "zhenqifang"  && !lockStr)
        {
            let descstr1 = LanguageManager.getlocal("housekeeper_desc_zhenqifang1");
            let descstr2 = LanguageManager.getlocal("housekeeper_desc_zhenqifang2");

            let descText1:BaseTextField = ComponentManager.getTextField(descstr1,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText1.setPosition(itemNameTF.x,60);
            node.addChild(descText1);

            let descText2:BaseTextField = ComponentManager.getTextField(descstr2,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN3);
            descText2.setPosition(itemNameTF.x,90);
            node.addChild(descText2);

            let parmsstr = Api.housekeeperVoApi.getCheckParms(data);
            let parmsArr = parmsstr.split("|");
            this._isCheck1 = (parmsArr[0]=="1");
            this._isCheck2 = (parmsArr[1]=="1");

            let checkbox1 = BaseBitmap.create( this._isCheck1 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox1.setPosition(bg.x+530,50);
            node.addChild(checkbox1);
            this._checkBox1 = checkbox1;
            checkbox1.addTouchTap(this.checkHandle1,this);

            let checkbox2 = BaseBitmap.create( this._isCheck2 ? "housekeeperview_check2":"housekeeperview_check1");
            checkbox2.setPosition(bg.x+530,85);
            node.addChild(checkbox2);
            this._checkBox2 = checkbox2;
            checkbox2.addTouchTap(this.checkHandle2,this);

             this._touchObj.push(checkbox1);
              this._touchObj.push(checkbox2);

            bg.height = checkbox2.y+checkbox2.height+16;
        }

        this.height = bg.height+5;
        this.checkNode();
    }

    private resetDesc():void
    {
        if (this._type == "bookroom")//书院
        {   
            let parm = false;
            if ( this._descText.text == "ABC")
            {
                parm = true;
            }
            let parmsstr = Api.housekeeperVoApi.getCheckParms(this._type,parm);
            let parmsArr = parmsstr.split("|");
            let servantNum = parmsArr.length;
            if (servantNum == 1 && parmsArr[0] == "")
            {
                servantNum = 0;
            }
            let seatNum = Api.bookroomVoApi.getMaxleng();
            this._descText.text = LanguageManager.getlocal("housekeeper_desc_"+this._type,[String(servantNum),String(seatNum)]);
        }
    }

    private createDrop():void
    {
        let posy = 0;
        if (this._type == "affair")
        {
            this._dropCfg=["housekeeper_choose_affair1","housekeeper_choose_affair2","housekeeper_choose_affair3"];
            posy = 70;
        }
        else if (this._type == "child")
        {
            this._dropCfg=["servantInfo_speciality1","servantInfo_speciality2","servantInfo_speciality3","servantInfo_speciality4"];
            posy = 130;
        }
        this._dropDownBtn = ComponentManager.getButton("housekeeperview_drop_btn","",this.dropDownBtnClickHandler,this,[0],null,20);
        this._dropDownBtn.setTargetSize(250,27);
        this._dropDownBtn.x = 230;
		this._dropDownBtn.y = posy;
		this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
		this._infoNode.addChild(this._dropDownBtn);
        this._dropDownBtn.setText(this._dropCfg[this._lastDropIdx-1],true,true);
		this._dropBtnList.push(this._dropDownBtn);

        this._touchObj.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("housekeeperview_droparrow");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2 -3;
		this.addChild(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer()
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
		this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
		this.addChild(this._dropDownContainer);

		for (let index = 1; index <=this._dropCfg.length; index++) {
			let tmpBtn = ComponentManager.getButton("housekeeperview_drop_btn","",this.dropDownBtnClickHandler,this,[index],null,20);
			tmpBtn.setTargetSize(250,27);
            this._dropBtnList.push(tmpBtn);
			tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
			tmpBtn.y = tmpBtn.height*(index-1) -3;
			this._dropDownContainer.addChild(tmpBtn);
			tmpBtn.setText(this._dropCfg[index-1],true,true);
		}

    }

    public dropDownBtnClickHandler(btnIdx:number)
    {
        let tmpIdx = this._lastDropIdx;
		for (var index = 1; index < this._dropBtnList.length; index++) {
			this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
		}
		this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;

            let parent = this.parent;
            parent.removeChild(this);
            parent.addChild(this);
		}
		if (btnIdx > 0 )
		{   
            this._lastDropIdx = btnIdx;
			this._dropDownBtn.setText(this._dropCfg[this._lastDropIdx-1],true,true);
		}

		if(tmpIdx == this._lastDropIdx)
		{
			return;
		}

        this.saveParms();
    }

    private checkHandle():void
    {   
        this._isCheck = !this._isCheck;
        this._checkBox.texture = ResourceManager.getRes(this._isCheck ? "housekeeperview_check2":"housekeeperview_check1");

        Api.housekeeperVoApi.setCheckType(this._type,this._isCheck? "1":"0");
        if (this._hasParms)
        {
            this.saveParms();
        }
        this.checkNode();

         App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_HOUSEKEEPER);
    }

    private checkHandle1():void
    {   
        this._isCheck1 = !this._isCheck1;
        this._checkBox1.texture = ResourceManager.getRes(this._isCheck1 ? "housekeeperview_check2":"housekeeperview_check1");
        this.saveParms();
    }

    private checkHandle2():void
    {   
        this._isCheck2 = !this._isCheck2;
        this._checkBox2.texture = ResourceManager.getRes(this._isCheck2 ? "housekeeperview_check2":"housekeeperview_check1");
        this.saveParms();
    }


    private saveParms():void
    {
        if (this._type == "affair")
        {   
            let value = String(this._lastDropIdx);
            Api.housekeeperVoApi.setCheckParms(this._type,value);
        }
        else if (this._type == "child")
        {
            let parms1:string = this._isCheck1 ? "1" : "0";
            let parms2:string = this._isCheck2 ? "1" : "0";
            let parms3:string = String(this._lastDropIdx);
            let parmsstr:string = parms1 +"|"+ parms2 + "|" + parms3;
            Api.housekeeperVoApi.setCheckParms(this._type,parmsstr);
        }
        else if (this._type == "wife")
        {
            let parms1:string = this._isCheck1 ? "1" : "0";
            Api.housekeeperVoApi.setCheckParms(this._type,parms1);
        }
        else if (this._type == "search")
        {   
            // let parms1:string = String(this._dragNum);
            // let parms2:string = this._isCheck1 ? "1" : "0";
            // let parms3:string = this._isCheck2 ? "1" : "0";
           
            // let parmsstr:string = parms1 +"|"+ parms2 + "|" + parms3;
            // Api.housekeeperVoApi.setCheckParms(this._type,parmsstr);

            let foodOpen:number=this._isCheck2?1:0;
			let goldOpen:number=this._isCheck1?1:0;

            NetManager.request(NetRequestConst.REQUEST_SEARCH_SET,{luckynum:this._dragNum,foodopen:foodOpen,goldopen:goldOpen});
        }
        else if (this._type == "conquest" || this._type == "trade")
        {
            let value = String(this._dragNum);
            Api.housekeeperVoApi.setCheckParms(this._type,value);
        } 
        else if (this._type == "zhenqifang")
        {
            let parms1:string = this._isCheck1 ? "1" : "0";
            let parms2:string = this._isCheck2 ? "1" : "0";
            let parmsstr:string = parms1 +"|"+ parms2 ;
            Api.housekeeperVoApi.setCheckParms(this._type,parmsstr);
        }
    }

    private dragCallback(curNum:number):void
	{
		this._dragNum = curNum;
        let descstr1 = LanguageManager.getlocal("housekeeper_desc_"+this._type+"1",[String(this._dragNum)]);
        this._dragText1.text = descstr1;
		
        if (this._type == "conquest")//征伐
        {   
            let num1 = 0;
            if (this._dragNum>=Api.conquestVoApi.getCid())
            {
                num1 = Api.conquestVoApi.getAttCostNum2(Api.conquestVoApi.getCid(),this._dragNum-Api.conquestVoApi.getCid()+1);
            }
            let num2 = Api.playerVoApi.getSoldier();
            let cost1 = App.StringUtil.changeIntToText(num1);
		    let cost2 =  App.StringUtil.changeIntToText(num2);
            let descstr2 
            if (num1>num2 )
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2_2",[cost2]);
            }
            else
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_conquest2",[cost1,cost2]);
            }
            this._dragText2.text = descstr2;
        }
        else if (this._type == "trade")//商贸
        {
             let num1 = 0;
            if (this._dragNum>=Number(Api.tradeVoApi.getCurrentCid()))
            {
                num1 = Api.tradeVoApi.getAttCostNum2(Number(Api.tradeVoApi.getCurrentCid()),this._dragNum-Number(Api.tradeVoApi.getCurrentCid())+1);
            }
            let num2 = Api.playerVoApi.getPlayerGold();
            let cost1 =	 App.StringUtil.changeIntToText(num1);
		    let cost2 =  App.StringUtil.changeIntToText(num2);
            let descstr2 :string;
            if (num1>num2 )
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2_2",[cost2.toString()]);
            }
            else
            {
                descstr2 = LanguageManager.getlocal("housekeeper_desc_trade2",[cost1.toString(),cost2.toString()]);
            }
            this._dragText2.text = descstr2;
        }
        
        this.saveParms();
	}

    private bookroomSaveParms(ids:string[]):void
    {
        let value = "";
        for (let i=0; i<ids.length; )
        {
            value += ids[i];
            i++;
            if (i<ids.length)
            {
                 value += "|";
            }
        }
        Api.housekeeperVoApi.setCheckParms(this._type,value);

        let servantNum = ids.length;
        let seatNum = Api.bookroomVoApi.getMaxleng();
        this._descText.text = LanguageManager.getlocal("housekeeper_desc_"+this._type,[String(servantNum),String(seatNum)]);
    }

    public getSpaceY():number
	{
		return 10;
	}

    private checkNode():void
    {
        if (this._isCheck)
        {
            App.DisplayUtil.changeToNormal(this._infoNode);
        }
        else
        {
             App.DisplayUtil.changeToGray(this._infoNode);
        }

        for (let i =0 ; i<this._touchObj.length; i++)
        {
            this._touchObj[i].touchEnabled = this._isCheck;
        }
    }

    public dispose():void
	{
		this._type = null;
        this._checkBox = null;
        this._isCheck = false;
        this._checkBox1 = null;
        this._isCheck1 = false;
        this._checkBox2 = null;
        this._isCheck2 = false;
        this._hasParms = false;

        this._dropDownContainer = null;
		this._dropDownBtn = null;
		this._dropDownFlag = null;
		this._dropBtnList = null;
		this._lastDropIdx = 1;
        this._dropCfg.length = 0;
        this._chooseBtn = null;
        this._descText = null;
        this._infoNode = null;
        this._touchObj.length = 0;

		super.dispose();
	}
}