import React, { useState, useRef } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={8}>
      <VStack spacing={6}>
        <Image src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJ8ZW58MHx8fHwxNzEzMTYzMjA4fDA&ixlib=rb-4.0.3&q=80&w=1080" borderRadius="md" />
        <Heading as="h2" size="xl">
          Song Title
        </Heading>
        <Text>Artist Name</Text>
        <Slider aria-label="seek-slider" value={currentTime} min={0} max={duration} onChange={handleSeek}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Flex justify="space-between" width="100%">
          <Text>{formatTime(currentTime)}</Text>
          <Text>{formatTime(duration)}</Text>
        </Flex>
        <Flex>
          <IconButton aria-label="previous" icon={<FaBackward />} onClick={() => (audioRef.current.currentTime -= 10)} mr={4} />
          <Button leftIcon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlay} px={8}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <IconButton aria-label="next" icon={<FaForward />} onClick={() => (audioRef.current.currentTime += 10)} ml={4} />
        </Flex>
      </VStack>
      <audio ref={audioRef} src="path/to/audio/file.mp3" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} />
    </Box>
  );
};

export default Index;
