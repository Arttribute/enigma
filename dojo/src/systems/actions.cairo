use dojo_starter::models::leaderboard::Leaderboard;
use starknet::ContractAddress;

// Define the interface
#[dojo::interface]
trait IActions {
    fn spawn(ref world: IWorldDispatcher);
    fn move(ref world: IWorldDispatcher, score: u8);
}

// Dojo contract decorator
#[dojo::contract]
mod actions {
    use super::IActions;
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::leaderboard::Leaderboard;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct Moved {
        #[key]
        player: ContractAddress,
        score: u8,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn spawn(ref world: IWorldDispatcher) {
            let player = get_caller_address();
            let leaderboard = Leaderboard { player, score: 0 };
            set!(world, (leaderboard));
        }

        fn move(ref world: IWorldDispatcher, score: u8) {
            let player = get_caller_address();
            let mut leaderboard = get!(world, player, (Leaderboard));
            leaderboard.score += score;
            set!(world, (leaderboard));
            emit!(world, Moved { player, score: leaderboard.score });
        }
    }
}
