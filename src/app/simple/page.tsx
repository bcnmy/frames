import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
} from "frames.js/next/server";

const reducer = (state: any) => ({ count: state.count + 1 });

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const previousFrame = getPreviousFrame(props.searchParams);

  await validateActionSignature(previousFrame.postBody);

  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame,
  );

  return (
    <>
      <FrameContainer
        postUrl="/frames"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src="https://picsum.photos/seed/frames.js/1146/600" />
        <FrameButton onClick={dispatch}>{state.count}</FrameButton>
      </FrameContainer>
    </>
  );
}
