import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
  
const TwitterTimeline = () => {
    const containerRef = useRef(null);

    useEffect(() => {
            const script = document.createElement('script');
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
    }, []);

    return (
        <Box ref={containerRef} width="full" >
            <a 
                className="twitter-timeline" 
                data-theme="dark"
                data-height="300"  // Here, the height is set to 300px. Adjust as needed.
                href="https://twitter.com/KnowleeAI"
            >
                Tweets by Knowlee
            </a>
        </Box>
    );
};

export default TwitterTimeline;
