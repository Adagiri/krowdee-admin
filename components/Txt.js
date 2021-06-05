



<FormControl
              mt={4}
              isRequired
              isInvalid={invalid.indexOf("txt") !== -1}
            >
              <FormLabel>Text</FormLabel>
              <Input
                value={txt}
                onChange={(e) => {
                  setText(e.target.value);

                  setInvalid([]);
                }}
                ref={initialRef}
                placeholder="task question"
              />
              <FormErrorMessage>
                {invalid.indexOf("txt") !== -1 && "text too short"}
              </FormErrorMessage>
            </FormControl>