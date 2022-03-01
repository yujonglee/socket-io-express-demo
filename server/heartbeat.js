export const heartbeat = () => {
    const pulse = Math.ceil(Math.random() * (160 - 60) + 60);

    console.log(`Heartbeat ${pulse}`);
    
    return pulse;
}
