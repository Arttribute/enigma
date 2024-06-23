use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::model]
struct Leaderboard {
    #[key]
    player: ContractAddress,
    score: u8,
}