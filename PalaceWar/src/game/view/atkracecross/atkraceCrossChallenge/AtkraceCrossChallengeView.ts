

class AtkraceCrossChallengeView extends PopupView
{	

    //挑战界面  //复仇  
    public servantList=[];
	public _scrollList: ScrollList=null;
	private challengebookNum:number =0;
    private _data:any =[];
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

        // 出使条件
		let missionTxt = ComponentManager.getTextField("atkracechallengedes",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		missionTxt.text =LanguageManager.getlocal("atkracechallengedes");
		missionTxt.x = _bg.x+20;
		missionTxt.y = _bg.y-24;
		this.addChild(missionTxt);

         // 挑战书
        this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
        let challengeBookTxt = ComponentManager.getTextField("atkracechallengebook",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        challengeBookTxt.x =missionTxt.x+400;
        challengeBookTxt.y = missionTxt.y;
        this.addChild(challengeBookTxt);
        
  

        if(AtkraceCrossChallengeItem.data.type==3)
        {
            // 追杀令
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1553);
            challengeBookTxt.text =LanguageManager.getlocal("atkracekill",[this.challengebookNum+""]);
        }
        else
        {
             //挑战书
            this.challengebookNum= Api.itemVoApi.getItemNumInfoVoById(1552);
            challengeBookTxt.text =LanguageManager.getlocal("atkracechallengebook",[this.challengebookNum+""]);
        }

        if(PlatformManager.checkIsTextHorizontal())
        {
            challengeBookTxt.setPosition(_bg.x + _bg.width - challengeBookTxt.width - 10,missionTxt.y)
        }
		let idList= Api.servantVoApi.getServantCountLevel60PlusList();
        let idList1=[];
        let idList2=[];
        for (var index = 0; index < idList.length; index++) {
            let key = idList[index];
			 if (! this.isBattleing(key))
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
		this._scrollList = ComponentManager.getScrollList(AtkraceCrossChallengeItem, keys, rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(55, _bg.y+5);
         
    }

     protected initView():void
     {
        
     }

	public isBattleing(servantId:string)
   	 {
		let myInfo:AtkraceInfoVo = Api.atkracecrossVoApi.getMyInfo();
        for (var key in myInfo.asids) {
            if(myInfo.asids[key] == servantId)
                return true;
        }
        return false;
    }
      protected getShowHeight():number
      {
          return 660;
      }

     public dispose():void
     {
		super.dispose();
        this.challengebookNum =0;
        this.servantList =[];
        this._data =null;
     }

}