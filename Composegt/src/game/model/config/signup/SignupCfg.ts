/**
 * 七日签到配置
 * author jiangliuyang
 * date 2018/10/23
 * @class SignUpCfg
 */

namespace Config 
{
	export namespace SignupCfg
	{
        let signup: Object = {};
        let signupReward: any = {};
        let signupRewardShared: any = {};

		export function formatData(data: any): void 
		{
			for (var key in data) 
			{ 
                if(key == "signup")
                {
                    signup = data["signup"];
                }
                if(key == "signupReward")
                {
                    signupReward = data["signupReward"];
                }  
                if(key == "signupRewardShared")
                {
                    signupRewardShared = data["signupRewardShared"];
                }               
			}	
		}
        export function getSignup():any
        {
            return signup;
        }
        export function getSignupReward():any
        {
            return signupReward;
        }
        export function getSignupRewardShared():any
        {
            return signupRewardShared;
        }
	}
}