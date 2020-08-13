

class NewAtkraceCrossChallengeView extends PopupView
{	

    //挑战界面  //复仇  
    public servantList=[];
	public _scrollList: ScrollList=null;
	private challengebookNum:number =0;
    private _data:any =[];
    private _costItem:number = 0;

    public constructor() 
	{   
		super();
	}

    protected getResourceList():string[]
	{
         return super.getResourceList().concat([
		]);
    }
     protected getTitleStr():string
     {
          //type 1挑战按钮  //2复仇   //3追杀
          if(AtkraceCrossChallengeItem.data)
          {
               if(AtkraceCrossChallengeItem.data.type==1)
                {
                    return "atkraceCrossChallenge";
                }
                else if(AtkraceCrossChallengeItem.data.type==2)
                {
                    return "atkraceCrossRevenge";
                }
                else if(AtkraceCrossChallengeItem.data.type==3)
                {
                    return "atkraceCrossVisitTab3";
                }
          }
  
         
     }
   
    protected resetBgSize():void
    {
         super.resetBgSize();
        //  var a  =  this.titleTF.y;
         let _bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		_bg.width = 528;
		_bg.height = 550;
		_bg.x = 55;
         _bg.y = this.titleTF.y+65;
		
		this.addChild(_bg);

        /**
		 * "atkraceinfo":{"allianceId":1100004,"level":20,"power":5615925218,"snum":83,"pic":3906,"rank":3,"name":"vip","iscankill":0,"point":-83},"fzid":11},
		 * 
		 */
        let info = this.param.data.info;
        let pointDiff = info.point - Api.atkracecrossVoApi.getPoint();
        let acCfg = Api.atkracecrossVoApi.getNewCrossCfg();
        let descstr1 = "";
        if (info.rank<=acCfg.lowerLimit3)
        {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point5",[String(acCfg.lowerLimit3)]);
        }
        else if (info.point <= acCfg.lowerLimit1)
        {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point4",[String(acCfg.lowerLimit1)]);
        }
        else if (pointDiff>=acCfg.lowerLimit2)
        {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point3",[String(acCfg.lowerLimit2)]);
        }
        else if (pointDiff<0)
        {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point2",[String(-pointDiff)]);
        }
        else
        {
            descstr1 = LanguageManager.getlocal("newatkraceServant_point1",[String(pointDiff)]);
        }
        let duishouName = LanguageManager.getlocal("newatkraceServantChallengeDes1_"+AtkraceCrossChallengeItem.data.type,[info.name,descstr1]);
        // 对方名字
		let missionTxt = ComponentManager.getTextField(duishouName,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt.x = _bg.x+20;
		missionTxt.y = _bg.y-24;
		this.addChild(missionTxt);

        //出战次数
        let times1= Api.atkracecrossVoApi.getUseTimes();
        let times2 = Api.servantVoApi.getServantCount();
        let fighttimestr = LanguageManager.getlocal("newatkraceServantChallengeDes2",[String(times2-times1),String(times2)]);

        let timesText = ComponentManager.getTextField(fighttimestr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        timesText.x =missionTxt.x;
        timesText.y = missionTxt.y+missionTxt.height+6;
        this.addChild(timesText);

        // 挑战书
        this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
        let numstr = LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        if(AtkraceCrossChallengeItem.data.type==3)
        {
            // 追杀令
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1553);
            numstr =LanguageManager.getlocal("atkracekill",[this.challengebookNum+""]);
        }
        else
        {
             //挑战书
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
            numstr =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        }

        this._costItem = Api.atkracecrossVoApi.getUseTimes2();
        numstr+= LanguageManager.getlocal("newatkraceServantChallengeDes3",[String(this._costItem)]);

        let challengeBookTxt = ComponentManager.getTextField(numstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        challengeBookTxt.x =missionTxt.x;
        challengeBookTxt.y = timesText.y+timesText.height+6;
        this.addChild(challengeBookTxt);
        
  
        _bg.y = challengeBookTxt.y+challengeBookTxt.height+7;
        

        // if(PlatformManager.checkIsTextHorizontal())
        // {
        //     challengeBookTxt.setPosition(_bg.x + _bg.width - challengeBookTxt.width - 10,missionTxt.y)
        // }
        let idList=  Api.atkracecrossVoApi.getNewCrossVo().getSids();
        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
			 if ( this.isBattleing(key))
            {
                idList1.push(key);
            }else
            {
                idList2.push(key);
            }
        }
		let keys = idList1.concat(idList2);
	 
		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 528, _bg.height-15);
		this._scrollList = ComponentManager.getScrollList(NewAtkraceCrossChallengeItem, keys, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(55, _bg.y+5);
         
    }

     protected initView():void
     {
        
     }

	public isBattleing(servantId:string)
   	 {
		let myInfo:AtkraceInfoVo = Api.atkracecrossVoApi.getMyInfo();
        let fighttime = Api.atkracecrossVoApi.getUseServantsTimes(servantId);
        if (fighttime<this._costItem)
        {
            return true;
        }
        return false;
    }
      protected getShowHeight():number
      {
          return 720;
      }

     public dispose():void
     {
		super.dispose();
        this.challengebookNum =0;
        this.servantList =[];
        this._data =null;
     }

}