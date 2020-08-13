namespace App
{
	/**
	 * 测试工具类
	 * author 陈可
	 * date 2018/12/25
	 * @class TestUtil
	 */
	export namespace TestUtil
	{

		/**
		 * 获取testplat参数，必须是已有的，否则返回空字符串
		 */
		export function getTestPlat():string
		{
			let testPlat:string=getRealTestPlat();
			if(testPlat&&testPlat.indexOf("test")==0&&testPlat!="test")
			{
				testPlat=testPlat.replace("test","");
			}
			return testPlat;
		}

		function getRealTestPlat():string
		{
			let realTestPlat:string=App.CommonUtil.getOption("testplat");
			let testPlat:string=realTestPlat;
			if(testPlat&&testPlat.indexOf("test")==0&&testPlat!="test")
			{
				testPlat=testPlat.replace("test","");
			}
			testPlat=testPlat&&ServerCfg.allHost[testPlat]?testPlat:"";
			if(!testPlat)
			{
				realTestPlat="";
			}
        	return realTestPlat;
		}

		/**
		 * 检测是否是testplat1000服
		 */
		export function checkIsTestPlat1000():boolean
		{
			let is1000Test:boolean=false;
			let testPlat:string=getRealTestPlat();
			if(testPlat&&testPlat.indexOf("test")==0&&testPlat!="test")
			{
				is1000Test=true;
			}
			return is1000Test;
		}


	}
}