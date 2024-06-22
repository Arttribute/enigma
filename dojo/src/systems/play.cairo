use dojo_starter::models::leaderboard::Leaderboard;
use starknet::ContractAddress;

#[dojo::interface]
trait IPlays {
    fn spawn(ref world: IWorldDispatcher);
    fn move(ref world: IWorldDispatcher);
}

#[derive(Copy, Drop, Serde)]
#[dojo::contract]
mod play {
    use super::IPlays;
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{
        leaderboard::Leaderboard,
    };

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct Played {
        #[key]
        player: ContractAddress,
        score: u8,
    }

    #[abi(embed_v0)]
    impl PlaysImpl of IPlays<ContractState> {
        fn spawn(ref world: IWorldDispatcher) {
            let player = get_caller_address();

            let leaderboard = Leaderboard {
                player,
                score: 0,
            };

            set!(world, (leaderboard));
        }
 
        fn move(ref world: IWorldDispatcher) {
            let player = get_caller_address();
 
            let mut leaderboard = get!(world, player, (Leaderboard));
            leaderboard.score += 10;
 
            set!(world, (leaderboard));
            emit!(world, (Played { player, score: leaderboard.score }));
        }
    }
}